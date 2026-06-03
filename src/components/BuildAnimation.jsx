import { MousePointer2 } from 'lucide-react';

/**
 * Animated browser window that assembles a website piece-by-piece,
 * with a cursor that moves and "clicks" the CTA — visualizing us
 * building a site for a customer. Pure CSS, no libraries.
 * Honors prefers-reduced-motion (keyframes collapse to a static frame).
 */
export default function BuildAnimation() {
  // Stagger each piece so it reads as sequential construction.
  const step = (delay, extra = '') => ({
    className: `anim-assemble ${extra}`,
    style: { animationDelay: `${delay}s` },
  });

  return (
    <div className="relative anim-float" aria-hidden="true">
      {/* Browser frame */}
      <div className="rounded-2xl bg-white shadow-2xl shadow-rose-900/15 ring-1 ring-slate-900/5 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 h-10 bg-slate-100 border-b border-slate-200">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 h-5 rounded bg-white border border-slate-200 flex items-center px-2">
            <span className="text-[10px] text-slate-400 truncate">yourbusiness.com</span>
          </div>
        </div>

        {/* Canvas being built */}
        <div className="relative p-4 h-64 bg-gradient-to-b from-rose-50/60 to-white">
          {/* Nav bar */}
          <div {...step(0.2)} className="anim-assemble flex items-center justify-between mb-3">
            <div className="h-3 w-16 rounded bg-rose-700" />
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-2 w-8 rounded bg-slate-300" />
            </div>
          </div>

          {/* Hero block + image */}
          <div className="grid grid-cols-5 gap-3 mb-3">
            <div className="col-span-3 space-y-2 pt-1">
              <div {...step(0.6)} className="anim-type h-3 rounded bg-slate-800" style={{ '--w': '90%', animationDelay: '0.6s' }} />
              <div {...step(0.9)} className="anim-type h-3 rounded bg-slate-800" style={{ '--w': '70%', animationDelay: '0.9s' }} />
              <div {...step(1.2)} className="anim-type h-2 rounded bg-slate-300" style={{ '--w': '100%', animationDelay: '1.2s' }} />
              <div {...step(1.4)} className="anim-type h-2 rounded bg-slate-300" style={{ '--w': '85%', animationDelay: '1.4s' }} />
            </div>
            <div {...step(0.7)} className="anim-assemble col-span-2 rounded-lg bg-gradient-to-br from-rose-200 to-rose-400" />
          </div>

          {/* Card row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1.6, 1.8, 2.0].map((d) => (
              <div key={d} {...step(d)} className="anim-assemble h-12 rounded-lg bg-white border border-slate-200 shadow-sm" />
            ))}
          </div>

          {/* CTA button (cursor clicks this) */}
          <div {...step(2.3)} className="anim-assemble inline-flex">
            <div className="h-7 px-4 rounded-lg bg-amber-400 flex items-center">
              <div className="h-2 w-12 rounded bg-amber-800/40" />
            </div>
          </div>

          {/* Moving cursor */}
          <MousePointer2
            className="absolute w-5 h-5 text-slate-900 fill-white drop-shadow"
            style={{ animation: 'cursor-path 7s ease-in-out infinite both', left: 0, top: 0 }}
          />
        </div>
      </div>

      {/* Floating "Done!" badge */}
      <div className="absolute -bottom-4 -right-3 bg-rose-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Launched
      </div>
    </div>
  );
}
