import { ArrowUpRight } from 'lucide-react';

const principles = [
  ['01', 'Local-first', 'Built for Door County operators — not templated for a generic market.'],
  ['02', 'Marketing-led', 'NWTC-trained strategy informs every layout, headline, and call-to-action.'],
  ['03', 'Modern stack', 'Fast, accessible, AI-ready websites that hold up for years, not months.'],
];

export default function Home() {
  return (
    <>
      <section className="container-x pt-10 md:pt-20 pb-24 md:pb-32 border-b rule">
        <p className="eyebrow mb-8">Sturgeon Bay · Wisconsin · Est. 2025</p>
        <h1 className="display font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
          Next-generation websites &amp; AI for the businesses of Door County.
        </h1>
        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <p className="text-stone-400 text-lg md:text-xl max-w-xl leading-relaxed">
            An independent studio combining engineering and marketing to give local
            small businesses an unfair advantage online.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#/contact" className="btn-light">Get a quote <ArrowUpRight className="w-4 h-4" /></a>
            <a href="#/services" className="btn-ghost">Services</a>
          </div>
        </div>
      </section>

      <section className="container-x py-24 border-b rule">
        <div className="grid md:grid-cols-3 gap-px bg-stone-800 border rule">
          {principles.map(([num, title, copy]) => (
            <div key={num} className="bg-black p-10">
              <p className="eyebrow mb-6">{num}</p>
              <h3 className="text-2xl font-display mb-3">{title}</h3>
              <p className="text-stone-400 leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6">Selected work</p>
          <h2 className="display font-display text-4xl md:text-6xl">
            Websites built to convert visitors into customers.
          </h2>
        </div>
        <div className="md:col-span-5 text-stone-400 leading-relaxed">
          From restaurants on 3rd Avenue to lodging in Fish Creek and shops in
          Sister Bay — we build sites engineered for clarity, speed, and bookings.
          <a href="#/contact" className="block mt-6 text-stone-100 underline underline-offset-4 decoration-stone-600 hover:decoration-stone-100">
            Start a project →
          </a>
        </div>
      </section>
    </>
  );
}
