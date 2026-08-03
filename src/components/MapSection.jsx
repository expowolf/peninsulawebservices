import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Globe, Bot, MapPin, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal.jsx';

// MapLibre is heavy; only load it once the section nears the viewport.
const DoorCountyMap = lazy(() => import('./DoorCountyMap.jsx'));

const services = [
  { icon: Globe, name: 'Custom Web Design', desc: 'Fast, mobile-first websites built to convert.' },
  { icon: Bot, name: 'AI Tools & Automation', desc: 'Chatbots and workflows that save you hours.' },
  { icon: MapPin, name: 'Local SEO & Marketing', desc: 'Get found by Door County locals and tourists.' },
];

function MapFallback() {
  return (
    <div className="h-[360px] md:h-[460px] w-full rounded-3xl bg-gradient-to-br from-steel-500/10 to-steel-50 ring-1 ring-slate-900/10 grid place-items-center">
      <span className="text-sm text-slate-400">Loading map…</span>
    </div>
  );
}

export default function MapSection() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '250px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="products" ref={ref} className="py-20 md:py-28 bg-neutral-900">
      <div className="container-x">
        <Reveal className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-neutral-500 mb-3">
            Wisconsin-Based, Working Everywhere
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            A studio close to home, working with clients anywhere.
          </h2>
          <p className="text-neutral-400 mt-4 text-lg">
            Headquartered in Wisconsin and partnering with businesses across the country —
            same responsive, hands-on service whether you're down the street or across the map.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Live map */}
          <div className="lg:col-span-7">
            {show ? (
              <Suspense fallback={<MapFallback />}>
                <DoorCountyMap />
              </Suspense>
            ) : (
              <MapFallback />
            )}
          </div>

          {/* Services */}
          <div className="lg:col-span-5 space-y-4">
            {services.map(({ icon: Icon, name, desc }, i) => (
              <Reveal key={name} delay={i * 90}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-neutral-800 hover:border-steel-500/30 hover:shadow-lg transition-all">
                  <span className="w-11 h-11 rounded-lg bg-steel-500/10 grid place-items-center shrink-0">
                    <Icon className="w-5 h-5 text-steel-500" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{name}</h3>
                    <p className="text-sm text-neutral-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <a
              href="#/services"
              className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-white hover:gap-2.5 transition-all"
            >
              Explore all services <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
