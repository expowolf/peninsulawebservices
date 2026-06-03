import { Check, ArrowRight } from 'lucide-react';
import Reveal from './Reveal.jsx';

/**
 * Transparent pricing (UI-UX Pro Max "Trust & Authority + Conversion" pattern).
 * One highlighted "most popular" tier; low-friction CTA into the quote form.
 *
 * PLACEHOLDER PRICING — confirm/replace `price` values with your real numbers
 * before launch. "Custom" tiers route to a quote instead of a fixed price.
 */
const tiers = [
  {
    name: 'Starter',
    price: '$799',
    blurb: 'A polished one-page site to get your business online fast.',
    features: ['Single-page website', 'Mobile-friendly & fast', 'Contact form + Google Maps', 'Basic on-page SEO'],
    popular: false,
  },
  {
    name: 'Business',
    price: '$1,799',
    blurb: 'A complete multi-page site built to bring in local customers.',
    features: ['Up to 5 custom pages', 'Local SEO setup', 'Google Business optimization', 'Lead-capture forms', '30 days of support'],
    popular: true,
  },
  {
    name: 'Growth',
    price: 'Custom',
    blurb: 'Full site plus AI tools and ongoing marketing support.',
    features: ['Everything in Business', 'AI chatbot & automation', 'Ongoing SEO & updates', 'Priority support'],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
      <div className="container-x">
        <Reveal className="max-w-2xl mb-12">
          <span className="eyebrow">Simple Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold">Honest pricing, no surprises.</h2>
          <p className="text-slate-600 mt-3">
            Straightforward packages for local businesses. Not sure which fits? Just ask — the quote is always free.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map(({ name, price, blurb, features, popular }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div
                className={`relative rounded-xl p-8 h-full flex flex-col transition-all duration-300 ${
                  popular
                    ? 'bg-white border-2 border-teal-700 shadow-xl md:-translate-y-2'
                    : 'bg-white border border-slate-200 hover:-translate-y-1 hover:shadow-lg'
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{name}</h3>
                <div className="mt-3 mb-1 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-slate-900">{price}</span>
                  {price !== 'Custom' && <span className="text-slate-400 text-sm">starting</span>}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{blurb}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#/contact"
                  className={`group ${popular ? 'btn-primary' : 'btn-secondary'} w-full`}
                >
                  {price === 'Custom' ? 'Get a Quote' : 'Get Started'}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
