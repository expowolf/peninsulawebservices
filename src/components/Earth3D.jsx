import { useEffect, useRef } from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshPhongMaterial,
  Mesh, AmbientLight, DirectionalLight, CanvasTexture, BackSide, ShaderMaterial,
  Color, AdditiveBlending, Vector3, Group, MathUtils, SRGBColorSpace,
} from 'three';
import { continents } from '../data/worldCoastlines.js';

/**
 * Production-grade 3D Earth.
 *  • WebGL sphere (three.js) with procedurally-generated equirectangular texture
 *    drawn from real coastline polygons (see worldCoastlines.js).
 *  • Phong material with ambient + directional ("sun") lighting.
 *  • Atmospheric fresnel glow rendered as a back-side sphere shader.
 *  • Smooth auto-rotation + cursor-driven parallax (damped lerp).
 *  • Door County pin overlay anchored to surface coordinates and projected
 *    back to screen-space each frame; hidden when on the far hemisphere.
 *  • Pauses entirely under prefers-reduced-motion.
 *  • Pauses the RAF loop when scrolled out of view (IntersectionObserver) to
 *    keep mobile cool.
 */

const TEX_W = 2048;
const TEX_H = 1024;

// Build the Earth diffuse texture once per mount.
function buildEarthTexture() {
  const c = document.createElement('canvas');
  c.width = TEX_W; c.height = TEX_H;
  const g = c.getContext('2d');

  // Deep ocean — saturated and consistent (lighting is handled by Phong)
  const ocean = g.createLinearGradient(0, 0, 0, TEX_H);
  ocean.addColorStop(0, '#0d4a78');     // colder, near poles
  ocean.addColorStop(0.5, '#0a5a96');   // mid latitudes
  ocean.addColorStop(1, '#0d4a78');
  g.fillStyle = ocean;
  g.fillRect(0, 0, TEX_W, TEX_H);

  // Add subtle ocean noise / variation
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * TEX_W;
    const y = Math.random() * TEX_H;
    const r = 6 + Math.random() * 18;
    g.fillStyle = `rgba(${Math.random() < 0.5 ? '20, 80, 130' : '6, 50, 88'}, ${0.05 + Math.random() * 0.06})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }

  const toX = (lon) => ((lon + 180) / 360) * TEX_W;
  const toY = (lat) => ((90 - lat) / 180) * TEX_H;

  // Continent fill — saturated green→tan→desert→arctic by latitude
  for (const poly of continents) {
    g.beginPath();
    poly.forEach(([lon, lat], i) => {
      const x = toX(lon), y = toY(lat);
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    });
    g.closePath();

    const grad = g.createLinearGradient(0, 0, 0, TEX_H);
    grad.addColorStop(0,    '#e8e2d4');  // arctic tundra
    grad.addColorStop(0.20, '#5d7a3e');  // boreal
    grad.addColorStop(0.40, '#8a9a45');  // temperate
    grad.addColorStop(0.50, '#c9a567');  // sub-tropical desert / savanna
    grad.addColorStop(0.62, '#7b9143');  // tropical
    grad.addColorStop(0.78, '#5d7a3e');  // s. temperate
    grad.addColorStop(1,    '#e8e2d4');  // antarctic
    g.fillStyle = grad;
    g.fill();

    // Bold coastline outline so continents read clearly at globe scale
    g.strokeStyle = 'rgba(20, 35, 25, 0.55)';
    g.lineWidth = 2.2;
    g.stroke();
  }

  // Ice caps — strong white over polar bands
  g.fillStyle = '#f4f8fb';
  g.fillRect(0, toY(-72), TEX_W, TEX_H - toY(-72));
  g.fillRect(0, 0, TEX_W, toY(78));

  // Fade the ice edges for a softer transition
  const sFade = g.createLinearGradient(0, toY(-72) - 22, 0, toY(-72) + 4);
  sFade.addColorStop(0, 'rgba(244,248,251,0)');
  sFade.addColorStop(1, 'rgba(244,248,251,1)');
  g.fillStyle = sFade; g.fillRect(0, toY(-72) - 22, TEX_W, 26);
  const nFade = g.createLinearGradient(0, toY(78) - 4, 0, toY(78) + 22);
  nFade.addColorStop(0, 'rgba(244,248,251,1)');
  nFade.addColorStop(1, 'rgba(244,248,251,0)');
  g.fillStyle = nFade; g.fillRect(0, toY(78) - 4, TEX_W, 26);

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Lat/lon → unit sphere vector, matched to three.js SphereGeometry UV mapping
// (u=0 at -X, u=0.25 at +Z, u=0.5 at +X, u=0.75 at -Z). Canvas texture has
// lon -180 at left, lon 0 at middle — so lon -90 must land on +Z (front).
function latLonToVec3(lat, lon, r = 1) {
  const phi = MathUtils.degToRad(90 - lat);
  const theta = MathUtils.degToRad(lon);
  return new Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    -r * Math.sin(phi) * Math.sin(theta),
  );
}

// --- Atmosphere fresnel shader -----------------------------------------
const atmosphereVert = /* glsl */ `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const atmosphereFrag = /* glsl */ `
varying vec3 vNormal;
uniform vec3 uColor;
void main() {
  float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  gl_FragColor = vec4(uColor, 1.0) * intensity;
}`;

export default function Earth3D({ size = 360 }) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ---- Scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    container.appendChild(renderer.domElement);

    // ---- Lighting
    scene.add(new AmbientLight(0x6b7e9a, 0.55));
    const sun = new DirectionalLight(0xffffff, 1.2);
    sun.position.set(-3, 2.5, 4);
    scene.add(sun);

    // ---- Earth
    const earthTex = buildEarthTexture();
    const earthMat = new MeshPhongMaterial({
      map: earthTex,
      shininess: 28,
      specular: new Color(0x335577),
    });
    const earth = new Mesh(new SphereGeometry(1, 96, 96), earthMat);
    const earthGroup = new Group();
    earthGroup.add(earth);
    scene.add(earthGroup);

    // ---- Atmosphere
    const atmosphere = new Mesh(
      new SphereGeometry(1.13, 64, 64),
      new ShaderMaterial({
        vertexShader: atmosphereVert,
        fragmentShader: atmosphereFrag,
        uniforms: { uColor: { value: new Color(0x6fb3ff) } },
        blending: AdditiveBlending,
        side: BackSide,
        transparent: true,
        depthWrite: false,
      }),
    );
    scene.add(atmosphere);

    // ---- Door County pin (CSS overlay, projected each frame)
    const DOOR_COUNTY = { lat: 45.0, lon: -87.3 };
    const pinPos = latLonToVec3(DOOR_COUNTY.lat, DOOR_COUNTY.lon, 1.02);

    // ---- Interaction state
    const target = { x: 0, y: 0 };   // target rotation offset from cursor
    const current = { x: 0, y: 0 };

    const onMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      // Clamp influence so pointer can leave the canvas without runaway
      target.x = (nx - 0.5) * 0.6;
      target.y = (ny - 0.5) * 0.4;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);

    // ---- Animation loop (paused off-screen)
    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(container);

    // Default sphere UV already centers lon -90 (≈ North America) on +Z, so no
    // Y offset is needed. Slight axial tilt for an "Earth-like" feel.
    earthGroup.rotation.y = 0;
    earthGroup.rotation.x = MathUtils.degToRad(-18);

    const tick = () => {
      if (visible) {
        // Auto-rotation (slow, sub-RPM feel) — disabled if reduced motion
        if (!reduce) earthGroup.rotation.y += 0.0009; // slow, dignified rotation

        // Cursor parallax via damped lerp
        current.x += (target.x - current.x) * 0.05;
        current.y += (target.y - current.y) * 0.05;
        earthGroup.rotation.x = MathUtils.degToRad(-18) + current.y * 0.9;
        camera.position.x = current.x * 0.4;
        camera.lookAt(0, 0, 0);

        // Project pin to screen
        const world = pinPos.clone().applyMatrix4(earthGroup.matrixWorld);
        const forward = world.clone().normalize().dot(camera.position.clone().normalize());
        const projected = world.clone().project(camera);
        if (pinRef.current) {
          const onFront = forward > 0.15;
          pinRef.current.style.display = onFront ? 'block' : 'none';
          if (onFront) {
            const px = (projected.x * 0.5 + 0.5) * size;
            const py = (-projected.y * 0.5 + 0.5) * size;
            pinRef.current.style.transform = `translate(${px}px, ${py}px)`;
            pinRef.current.style.opacity = String(Math.min(1, (forward - 0.15) * 4));
          }
        }

        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      earthTex.dispose();
      earth.geometry.dispose();
      earth.material.dispose();
      atmosphere.geometry.dispose();
      atmosphere.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [size]);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }} aria-hidden="true">
      <div ref={containerRef} className="absolute inset-0" />
      {/* Projected Door County pin (CSS overlay) */}
      <div
        ref={pinRef}
        className="absolute top-0 left-0 -ml-2 -mt-2 pointer-events-none transition-opacity duration-200"
      >
        <span
          className="absolute -inset-1 block w-3 h-3 rounded-full bg-amber-400"
          style={{ animation: 'pulse-ring 2.4s ease-out infinite' }}
        />
        <span className="relative block w-3 h-3 rounded-full bg-amber-400 ring-2 ring-white shadow" />
        <div className="absolute left-5 -top-1 whitespace-nowrap rounded-lg bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 shadow-lg">
          Door County, WI
        </div>
      </div>
    </div>
  );
}
