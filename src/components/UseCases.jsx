import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { RestaurantImage, ShopImage } from './ImagePlaceholder.jsx';

const cases = [
  {
    Img: RestaurantImage,
    label: 'Restaurants & Cafés',
    overlay: 'View case',
    bg: 'bg-orange-50',
    desc: 'Menus, hours, online reservations.',
  },
  {
    Img: ShopImage,
    label: 'Shops & Retail',
    overlay: 'View case',
    bg: 'bg-violet-50',
    desc: 'Storefronts, products, foot traffic.',
  },
  {
    Img: RestaurantImage,
    label: 'Lodging & B&Bs',
    overlay: 'View case',
    bg: 'bg-amber-50',
    desc: 'Rooms, bookings, season info.',
  },
  {
    Img: ShopImage,
    label: 'Local Services',
    overlay: 'View case',
    bg: 'bg-rose-50',
    desc: 'Plumbers, contractors, guides.',
  },
  {
    Img: RestaurantImage,
    label: 'Tourism & Events',
    overlay: 'View case',
    bg: 'bg-rose-50',
    desc: 'Seasonal events and attractions.',
  },
];

export default function UseCases() {
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">
              <span className="font-light text-slate-500 block">Built for</span>
              <span className="font-bold text-slate-900">Door County businesses.</span>
            </h2>
            <p className="text-slate-600 mt-3 max-w-xl">
              From the restaurants on 3rd Avenue to shops in Sister Bay — every site is
              tuned to how locals and tourists actually search.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="w-11 h-11 grid place-items-center rounded-full border-2 border-slate-200 hover:border-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="w-11 h-11 grid place-items-center rounded-full border-2 border-slate-200 hover:border-slate-900 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6"
        >
          {cases.map(({ Img, label, overlay, bg, desc }, i) => (
            <article
              key={i}
              className="relative shrink-0 w-[78%] sm:w-[48%] lg:w-[32%] snap-start rounded-2xl overflow-hidden bg-white shadow-sm group cursor-pointer"
            >
              <div className={`h-56 overflow-hidden ${bg} transition-transform duration-500 group-hover:scale-[1.03]`}>
                <Img />
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-500">{desc}</p>
                <h3 className="font-bold text-lg text-slate-900 mt-1">{label}</h3>
              </div>
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-slate-900/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 fill-current" /> {overlay}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
