import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

// PLACEHOLDER posts — replace once real blog content exists.
const posts = [
  {
    tag: 'Local SEO',
    title: '5 Google ranking tips for Door County businesses',
    date: 'Coming soon',
    accent: 'from-teal-200 to-teal-50',
  },
  {
    tag: 'AI',
    title: 'How a small shop saved 8 hours a week with an AI chatbot',
    date: 'Coming soon',
    accent: 'from-amber-200 to-amber-50',
  },
  {
    tag: 'Web Design',
    title: 'What separates a $200 site from a $2,000 site',
    date: 'Coming soon',
    accent: 'from-violet-200 to-violet-50',
  },
  {
    tag: 'Marketing',
    title: 'Tourism season prep: a 4-week checklist',
    date: 'Coming soon',
    accent: 'from-rose-200 to-rose-50',
  },
  {
    tag: 'Case Study',
    title: 'How a Sturgeon Bay café tripled online orders',
    date: 'Coming soon',
    accent: 'from-emerald-200 to-emerald-50',
  },
];

export default function BlogCarousel() {
  const railRef = useRef(null);
  const scroll = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-100">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-slate-500 mb-3">
              From the Studio
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900">
              Notes &amp; insights.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#/contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:gap-2.5 transition-all"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                className="w-11 h-11 grid place-items-center rounded-full border-2 border-slate-200 hover:border-slate-900 transition-colors bg-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                className="w-11 h-11 grid place-items-center rounded-full border-2 border-slate-200 hover:border-slate-900 transition-colors bg-white"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6"
        >
          {posts.map((post, i) => (
            <article
              key={i}
              className="shrink-0 w-[78%] sm:w-[48%] lg:w-[30%] snap-start bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow group"
            >
              <div className={`h-44 bg-gradient-to-br ${post.accent} transition-transform duration-500 group-hover:scale-[1.02]`} />
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 leading-snug mb-4 group-hover:text-teal-700 transition-colors">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:gap-2.5 transition-all">
                  Read article <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
