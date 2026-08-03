import { motion } from 'framer-motion';
import { Target, Sparkles, Gauge, MessageSquare, TrendingUp } from 'lucide-react';

/**
 * Branded bento grid (adapted from the provided FUI bento). Keeps the
 * asymmetric layout + hover motion, but replaces the external demo imagery
 * with dark steel graphics and Peninsula content. Sharp corners + hairline
 * borders to match the Wall-Street theme.
 */

function BentoCard({ className = '', eyebrow, title, description, graphic }) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      className={`group relative flex flex-col overflow-hidden rounded-none bg-neutral-950
                  border border-neutral-800 transition-colors duration-300 hover:border-steel-600
                  [box-shadow:0_-20px_80px_-20px_rgba(84,120,176,0.12)_inset] ${className}`}
    >
      {/* Graphic zone */}
      <div className="relative h-56 shrink-0 overflow-hidden">
        {graphic}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
      </div>
      {/* Copy */}
      <div className="relative z-20 p-8 -mt-16">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-steel-400">{eyebrow}</p>
        <p className="mt-2 text-xl font-medium tracking-tight text-white">{title}</p>
        <p className="mt-2 max-w-[600px] text-sm leading-6 text-neutral-400">{description}</p>
      </div>
    </motion.div>
  );
}

// Reusable dark graphic: giant faded icon over a steel radial glow + grid
function Graphic({ Icon, offset = '' }) {
  return (
    <div className="absolute inset-0 bg-neutral-900">
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(84,120,176,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(84,120,176,.08)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-steel-500/20 blur-3xl" />
      <Icon
        className={`absolute text-steel-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:text-steel-400/50 ${offset}`}
        style={{ width: 150, height: 150 }}
        strokeWidth={1}
        aria-hidden="true"
      />
    </div>
  );
}

export default function BentoGrid() {
  return (
    <div className="w-full">
      <p className="eyebrow">Why Peninsula</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-3">
        Built like a firm. Priced like a partner.
      </h2>
      <p className="max-w-2xl text-lg text-neutral-400 mb-10">
        The discipline of an agency, the speed of modern tooling, and the accountability
        of working directly with the person who builds your site.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Strategy"
          title="Marketing-trained, not just technical"
          description="Formal NWTC marketing training means every layout, headline, and call-to-action is engineered to convert — not just to look good."
          graphic={<Graphic Icon={Target} offset="right-6 bottom-2" />}
          className="lg:col-span-3"
        />
        <BentoCard
          eyebrow="Speed"
          title="AI-accelerated delivery"
          description="Modern AI tooling lets us design, build, and iterate in a fraction of the usual time — so you launch sooner and start winning business."
          graphic={<Graphic Icon={Sparkles} offset="right-6 bottom-2" />}
          className="lg:col-span-3"
        />
        <BentoCard
          eyebrow="Performance"
          title="A fast, modern stack"
          description="Sub-second loads, mobile-first, SEO-ready from day one."
          graphic={<Graphic Icon={Gauge} offset="left-1/2 -translate-x-1/2 bottom-2" />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Access"
          title="Talk to the builder"
          description="No account managers or offshore handoffs — direct line to the person writing your code."
          graphic={<Graphic Icon={MessageSquare} offset="left-1/2 -translate-x-1/2 bottom-2" />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Results"
          title="Built to convert"
          description="Leads, calls, and bookings — measured, not assumed."
          graphic={<Graphic Icon={TrendingUp} offset="left-1/2 -translate-x-1/2 bottom-2" />}
          className="lg:col-span-2"
        />
      </div>
    </div>
  );
}
