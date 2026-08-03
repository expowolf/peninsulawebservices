import { Smartphone, Zap, Search, Bot, Gauge, Lock, MapPin, Mail, Star, Code2 } from 'lucide-react';

const items = [
  { icon: Smartphone, label: 'Mobile-First' },
  { icon: Zap, label: 'Lightning Fast' },
  { icon: Search, label: 'SEO-Ready' },
  { icon: Bot, label: 'AI-Powered' },
  { icon: Gauge, label: 'Performance' },
  { icon: Lock, label: 'Secure HTTPS' },
  { icon: MapPin, label: 'Local SEO' },
  { icon: Mail, label: 'Lead Capture' },
  { icon: Star, label: 'Reviews' },
  { icon: Code2, label: 'Custom Built' },
];

export default function IconTicker() {
  // Duplicate the row so the marquee loops seamlessly
  const row = [...items, ...items];
  return (
    <section className="border-y border-neutral-800 bg-neutral-900 py-10 overflow-hidden">
      <p className="text-center text-sm text-neutral-500 mb-6">
        Everything modern websites need — built in from day one.
      </p>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'ticker 32s linear infinite', width: 'max-content' }}
      >
        {row.map(({ icon: Icon, label }, i) => (
          <div key={i} className="flex items-center gap-2 text-neutral-400 shrink-0">
            <Icon className="w-5 h-5 text-steel-500" aria-hidden="true" />
            <span className="font-medium text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
