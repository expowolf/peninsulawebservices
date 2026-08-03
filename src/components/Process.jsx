import { MessageSquare, PenTool, Rocket } from 'lucide-react';
import Reveal from './Reveal.jsx';

/**
 * "How It Works" process strip — reduces friction for first-time small-business
 * buyers (UI-UX Pro Max landing pattern: simple 3-step flow before pricing/CTA).
 */
const steps = [
  {
    icon: MessageSquare,
    title: 'Free Consultation',
    text: 'We talk through your business, goals, and budget. No pressure, no jargon — just a clear plan.',
  },
  {
    icon: PenTool,
    title: 'Design & Build',
    text: 'I design and build your site with conversion, speed, and local SEO baked in from day one.',
  },
  {
    icon: Rocket,
    title: 'Launch & Grow',
    text: 'We go live, get you found on Google, and I stay on call for updates and support.',
  },
];

export default function Process() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <Reveal className="max-w-2xl mb-12">
          <span className="eyebrow">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold">Simple, friendly, done right.</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="relative card h-full p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-display text-5xl font-bold text-amber-500/20 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-11 h-11 rounded-lg bg-amber-500/10 grid place-items-center">
                    <Icon className="w-5 h-5 text-amber-500" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-neutral-400 leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
