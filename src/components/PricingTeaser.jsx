import { ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Free Consultation',
    sub: 'Start with a no-pressure conversation.',
    desc: 'A 30-minute call to talk through your business, goals, and what a great site would look like. No commitment, no jargon.',
    cta: 'Book a call',
    href: '#/contact',
    dark: false,
  },
  {
    name: 'Project Quote',
    sub: 'Get a clear plan and a flat price.',
    desc: 'Tell me about your project and I\'ll send a detailed proposal — fixed price, fixed timeline, no surprises.',
    cta: 'Get a quote',
    href: '#/contact',
    dark: true,
  },
];

export default function PricingTeaser() {
  return (
    <section className="py-20 md:py-28 bg-neutral-900">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-neutral-500 mb-3 text-center">
          Get Started
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto mb-14">
          Two simple ways to begin.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tiers.map(({ name, sub, desc, cta, href, dark }) => (
            <div
              key={name}
              className={`p-8 md:p-10 rounded-3xl flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                dark
                  ? 'bg-slate-900 text-white border-2 border-slate-900'
                  : 'bg-neutral-950 border-2 border-neutral-800'
              }`}
            >
              <h3 className={`font-display text-2xl font-bold ${dark ? '' : 'text-white'}`}>{name}</h3>
              <p className={`text-sm mt-2 ${dark ? 'text-slate-400' : 'text-neutral-500'}`}>{sub}</p>
              <p className={`mt-5 leading-relaxed ${dark ? 'text-slate-300' : 'text-neutral-400'}`}>{desc}</p>
              <a
                href={href}
                className={`mt-8 inline-flex items-center gap-2 self-start px-6 py-3 text-sm font-semibold rounded-full transition-all active:scale-[0.98] group ${
                  dark
                    ? 'bg-neutral-900 text-white hover:bg-slate-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
