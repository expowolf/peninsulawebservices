import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

/**
 * Real interactive vector map of Door County (MapLibre GL + free Carto
 * "positron" basemap — no API key needed). Branded cherry pin on the studio
 * location with a popup. cooperativeGestures so it doesn't hijack page scroll.
 */
export default function DoorCountyMap() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-87.15, 45.05], // Door County peninsula
      zoom: 8.1,
      attributionControl: { compact: true },
      cooperativeGestures: true, // ctrl/⌘ + scroll to zoom; two-finger on touch
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }),
      'bottom-right',
    );

    // Branded pin (cherry dot + white ring + amber pulse)
    const el = document.createElement('div');
    el.style.width = '18px';
    el.style.height = '18px';
    el.style.position = 'relative';
    el.innerHTML = `
      <span style="position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:9999px;background:#fbbf24;animation:pulse-ring 2.4s ease-out infinite;"></span>
      <span style="position:relative;display:block;width:18px;height:18px;border-radius:9999px;background:#be123c;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35);"></span>
    `;

    const popup = new maplibregl.Popup({ offset: 20, closeButton: false }).setHTML(
      `<div style="font-family:'DM Sans',system-ui,sans-serif;padding:4px 6px;line-height:1.35;">
         <strong style="color:#0f172a;display:block;">Peninsula Web Services</strong>
         <span style="color:#64748b;font-size:12px;">Sturgeon Bay · Door County, WI</span>
       </div>`,
    );

    new maplibregl.Marker({ element: el, anchor: 'center' })
      .setLngLat([-87.377, 44.834]) // Sturgeon Bay
      .setPopup(popup)
      .addTo(map);

    map.on('load', () => map.resize());

    return () => map.remove();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[360px] md:h-[460px] w-full rounded-3xl overflow-hidden ring-1 ring-slate-900/10 shadow-xl shadow-slate-900/5"
    />
  );
}
