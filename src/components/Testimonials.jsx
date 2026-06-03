import { Star, Quote } from 'lucide-react';
import Reveal from './Reveal.jsx';

/**
 * Social-proof section (UI-UX Pro Max "Hero + Testimonials + CTA" pattern:
 * 3-5 quotes with name + role, light background, placed before the final CTA).
 *
 * PLACEHOLDER COPY — replace `testimonials` with real client quotes before
 * launch. Initials avatars are generated (no image hosting needed).
 */
const testimonials = [
  {
    quote:
      'Our new site finally looks as good as our food. We started getting reservation calls the same week it went live.',
    name: 'Sample Client',
    role: 'Owner, Waterfront Restaurant · Sturgeon Bay',
    accent: 'bg-teal-600',
  },
  {
    quote:
      'They actually understood our busy season. The site is fast, easy to update, and shows up on Google when tourists search.',
    name: 'Sample Client',
    role: 'Manager, Door County Gift Shop',
    accent: 'bg-amber-500',
  },
  {
    quote:
      'Local, responsive, and genuinely good at this. It felt like working with a neighbor who happens to be a pro.',
    name: 'Sample Client',
    role: 'Founder, Local Services Co.',
    accent: 'bg-slate-700',
  },
];

const initials = (name) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
      <div className="container-x">
        <Reveal className="max-w-2xl mb-12">
          <span className="eyebrow">What Clients Say</span>
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by local businesses.</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, accent }, i) => (
            <Reveal key={role} delay={i * 100}>
              <figure className="card h-full p-7 flex flex-col">
                <Quote className="w-7 h-7 text-teal-200 mb-3" aria-hidden="true" />
                <div className="flex gap-0.5 mb-3 text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed flex-1">“{quote}”</blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                  <span
                    className={`w-10 h-10 rounded-full ${accent} text-white grid place-items-center text-sm font-semibold`}
                    aria-hidden="true"
                  >
                    {initials(name)}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900 text-sm">{name}</span>
                    <span className="block text-xs text-slate-500">{role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
