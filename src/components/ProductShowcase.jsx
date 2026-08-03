import { useState } from 'react';
import { ArrowUpRight, Globe, Bot, MapPin } from 'lucide-react';
import BuildAnimation from './BuildAnimation.jsx';
import WisconsinMap from './WisconsinMap.jsx';

const products = [
  {
    id: 'web',
    icon: Globe,
    name: 'Custom Web Design',
    desc: 'Fast, mobile-first websites engineered to convert visitors into customers.',
    Visual: () => (
      <div className="w-full max-w-xl mx-auto">
        <BuildAnimation />
      </div>
    ),
    accent: 'from-amber-500/20 to-amber-50',
  },
  {
    id: 'ai',
    icon: Bot,
    name: 'AI Tools & Automation',
    desc: 'Smart chatbots, automated emails, and AI workflows that save you hours every week.',
    Visual: () => (
      <div className="grid place-items-center w-full">
        <div className="relative bg-neutral-900 rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-6 w-full max-w-md">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
            <Bot className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold text-white">AI Concierge</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-neutral-300 max-w-[80%]">
              Are you open Sunday?
            </div>
            <div className="ml-auto bg-amber-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
              Yes — Sun 10am–8pm. Want me to book a table?
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-neutral-300 max-w-[40%]">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '120ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '240ms' }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    accent: 'from-violet-100 to-amber-500/10',
  },
  {
    id: 'seo',
    icon: MapPin,
    name: 'Local SEO & Marketing',
    desc: 'NWTC-trained strategy to get found on Google by Door County locals and tourists.',
    Visual: () => (
      <div className="w-full grid place-items-center min-h-[360px]">
        <WisconsinMap />
      </div>
    ),
    accent: 'from-amber-100 to-amber-500/10',
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(products[0].id);
  const current = products.find((p) => p.id === active);
  const Visual = current.Visual;

  return (
    <section id="products" className="py-20 md:py-28 bg-neutral-900">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-neutral-500 mb-3 text-center">
          What We Build
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto mb-14">
          One studio. Everything your business needs to win online.
        </h2>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: clickable product list */}
          <div className="lg:col-span-5 space-y-3">
            {products.map(({ id, icon: Icon, name, desc }) => {
              const isActive = id === active;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                      : 'border-neutral-800 bg-neutral-900 hover:border-slate-400'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-10 h-10 rounded-lg grid place-items-center shrink-0 ${
                        isActive ? 'bg-neutral-900/10' : 'bg-amber-500/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-amber-500'}`} aria-hidden="true" />
                    </span>
                    <div>
                      <div className={`font-bold text-base ${isActive ? '' : 'text-white'}`}>{name}</div>
                      <p className={`text-sm mt-1 leading-relaxed ${isActive ? 'text-slate-300' : 'text-neutral-400'}`}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            <a href="#/services" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-white hover:gap-2.5 transition-all">
              Explore all services <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: visual that updates with selection */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-3xl p-8 md:p-12 min-h-[360px] grid place-items-center bg-gradient-to-br ${current.accent} transition-colors duration-500`}
            >
              <Visual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
