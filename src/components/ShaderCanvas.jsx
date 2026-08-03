import { useEffect, useRef } from 'react';
import {
  Scene, OrthographicCamera, WebGLRenderer, BufferGeometry, BufferAttribute,
  Mesh, RawShaderMaterial, DoubleSide,
} from 'three';

/**
 * WebGL fragment shader rendered into a canvas that fills the hero section
 * (NOT fixed to the viewport — fills only the parent). Fragment shader
 * retinted from the original RGB-neon demo to cherry/amber/burgundy so it
 * matches the Peninsula brand palette.
 *
 * Disabled under prefers-reduced-motion (renders one static frame).
 */

const vertexShader = `
attribute vec3 position;
void main() { gl_Position = vec4(position, 1.0); }
`;

// Same wave/distortion math as the demo, recolored to brand tones.
const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float xScale;
uniform float yScale;
uniform float distortion;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float d = length(p) * distortion;

  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);

  float a = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
  float c = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

  // Brand-tinted: steel blue, light silver, deep navy
  vec3 steel  = vec3(0.329, 0.470, 0.690);   // #5478b0
  vec3 silver = vec3(0.741, 0.800, 0.900);   // light steel highlight
  vec3 navy   = vec3(0.086, 0.137, 0.247);   // #16233f

  vec3 color = steel * a + silver * b * 0.7 + navy * c * 0.9;
  gl_FragColor = vec4(color, 1.0);
}
`;

export default function ShaderCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parent = canvas.parentElement;

    const renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1);

    const uniforms = {
      resolution: { value: [1, 1] },
      time:       { value: 0 },
      xScale:     { value: 1.0 },
      yScale:     { value: 0.5 },
      distortion: { value: 0.06 },
    };

    // Fullscreen triangle pair
    const positions = new Float32Array([
      -1, -1, 0,   1, -1, 0,  -1, 1, 0,
       1, -1, 0,  -1,  1, 0,   1, 1, 0,
    ]);
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    const material = new RawShaderMaterial({
      vertexShader, fragmentShader, uniforms, side: DoubleSide,
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const w = parent.clientWidth, h = parent.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.resolution.value = [w, h];
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(parent);

    const tick = () => {
      if (visible) {
        if (!reduce) uniforms.time.value += 0.01;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />;
}
