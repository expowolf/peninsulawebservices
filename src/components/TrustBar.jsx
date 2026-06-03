import { useEffect, useState } from 'react';
import { GraduationCap, MapPin, Clock, TrendingUp } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';

/**
 * "Trust & Authority" credentials strip (UI-UX Pro Max recommendation for
 * service businesses). Numeric stats count up once when scrolled into view;
 * non-numeric credentials render instantly. Honors reduced-motion via useReveal.
 */
const stats = [
  { icon: GraduationCap, value: null, display: 'NWTC', label: 'Marketing-trained strategy' },
  { icon: MapPin, value: 100, suffix: '%', label: 'Local to Door County' },
  { icon: Clock, value: 24, suffix: 'hr', label: 'Quote response time' },
  { icon: TrendingUp, value: null, display: 'Built to', label: 'convert, not just look good' },
];

function CountUp({ end, suffix = '', run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setN(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, end]);
  return <>{n}{suffix}</>;
}

export default function TrustBar() {
  const [ref, visible] = useReveal({ threshold: 0.3 });
  return (
    <section className="border-y border-slate-200 bg-white" aria-label="Credentials and proof points">
      <div ref={ref} className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
        {stats.map(({ icon: Icon, value, suffix, display, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2 px-4 py-8 lg:py-10">
            <Icon className="w-6 h-6 text-rose-700" aria-hidden="true" />
            <div className="font-display text-3xl md:text-4xl font-bold text-slate-900 tabular-nums">
              {value != null ? <CountUp end={value} suffix={suffix} run={visible} /> : display}
            </div>
            <p className="text-sm text-slate-500 leading-snug max-w-[14rem]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
