import { motion, useSpring } from 'framer-motion';
import { useState, useRef, useEffect, createContext, useContext } from 'react';
import confetti from 'canvas-confetti';
import { Check, Star } from 'lucide-react';
import NumberFlow from '@number-flow/react';

/**
 * Interactive pricing with a 3-way billing toggle (Monthly / Annual / One-time),
 * a cursor-reactive starfield, confetti on savings modes, and NumberFlow price
 * animation. Converted from the provided .tsx to .jsx and adapted to the rose
 * brand (no shadcn CSS vars / cn / next dependencies).
 */

function useMediaQuery(query) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const result = matchMedia(query);
    const onChange = (e) => setValue(e.matches);
    result.addEventListener('change', onChange);
    setValue(result.matches);
    return () => result.removeEventListener('change', onChange);
  }, [query]);
  return value;
}

// --- Starfield -----------------------------------------------------------
function StarDot({ mousePosition, containerRef }) {
  const [initialPos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });
  const spring = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, spring);
  const springY = useSpring(0, spring);
  const [size] = useState(1 + Math.random() * 2);
  const [dur] = useState(2 + Math.random() * 3);
  const [delay] = useState(Math.random() * 5);

  useEffect(() => {
    if (!containerRef.current || mousePosition.x === null) {
      springX.set(0); springY.set(0); return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const sx = rect.left + (parseFloat(initialPos.left) / 100) * rect.width;
    const sy = rect.top + (parseFloat(initialPos.top) / 100) * rect.height;
    const dx = mousePosition.x - sx, dy = mousePosition.y - sy;
    const dist = Math.hypot(dx, dy);
    const radius = 500;
    if (dist < radius) {
      const force = 1 - dist / radius;
      springX.set(dx * force * 0.5);
      springY.set(dy * force * 0.5);
    } else { springX.set(0); springY.set(0); }
  }, [mousePosition, initialPos, containerRef, springX, springY]);

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ top: initialPos.top, left: initialPos.left, width: size, height: size, x: springX, y: springY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay }}
    />
  );
}

function Starfield({ mousePosition, containerRef }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 90 }).map((_, i) => (
        <StarDot key={i} mousePosition={mousePosition} containerRef={containerRef} />
      ))}
    </div>
  );
}

// --- Billing context -----------------------------------------------------
const MODES = [
  { id: 'monthly', label: 'Monthly', note: null },
  { id: 'annual', label: 'Annual', note: 'Save 20%' },
  { id: 'onetime', label: 'One-time', note: 'Pay once' },
];

const PricingContext = createContext({ mode: 'monthly', setMode: () => {} });

export default function PricingSection({
  plans,
  title = 'Simple, transparent pricing',
  description = 'Retainer care-plans or a one-time project build — pick what fits, and start today.',
}) {
  const [mode, setMode] = useState('monthly');
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  return (
    <PricingContext.Provider value={{ mode, setMode }}>
      <div
        ref={containerRef}
        onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        className="relative w-full bg-slate-950 text-white py-20 sm:py-24 overflow-hidden"
      >
        <Starfield mousePosition={mousePosition} containerRef={containerRef} />
        <div className="relative z-10 container-x">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-white">{title}</h2>
            <p className="text-slate-400 text-lg">{description}</p>
          </div>
          <BillingToggle />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-start gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

function BillingToggle() {
  const { mode, setMode } = useContext(PricingContext);
  const wrapRef = useRef(null);
  const btnRefs = useRef({});
  const [pill, setPill] = useState({});

  useEffect(() => {
    const el = btnRefs.current[mode];
    if (el) setPill({ width: el.offsetWidth, transform: `translateX(${el.offsetLeft}px)` });
  }, [mode]);

  const onSelect = (id) => {
    if (id === mode) return;
    setMode(id);
    if ((id === 'annual' || id === 'onetime') && btnRefs.current[id]) {
      const rect = btnRefs.current[id].getBoundingClientRect();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        colors: ['#5478b0', '#9db2d6', '#ffffff'],
        ticks: 250, gravity: 1.2, decay: 0.94, startVelocity: 28,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div ref={wrapRef} className="relative flex w-fit items-center rounded-full bg-neutral-900/10 p-1">
        <motion.div
          className="absolute left-0 top-1 bottom-1 rounded-full bg-steel-500"
          style={pill}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
        {MODES.map((m) => (
          <button
            key={m.id}
            ref={(el) => (btnRefs.current[m.id] = el)}
            onClick={() => onSelect(m.id)}
            className={`relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors ${
              mode === m.id ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {m.label}
            {m.note && (
              <span className={`hidden sm:inline ml-1 ${mode === m.id ? 'text-white/80' : 'text-steel-400'}`}>
                ({m.note})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function PricingCard({ plan, index }) {
  const { mode } = useContext(PricingContext);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const value =
    mode === 'monthly' ? Number(plan.price)
    : mode === 'annual' ? Number(plan.yearlyPrice)
    : Number(plan.oneTimePrice);

  const period = mode === 'onetime' ? 'one-time' : mode === 'annual' ? 'yr' : 'mo';
  const billedNote =
    mode === 'monthly' ? 'Billed monthly'
    : mode === 'annual' ? 'Billed annually'
    : 'One-time project fee';

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: plan.isPopular && isDesktop ? -20 : 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20, delay: index * 0.15 }}
      className={`rounded-2xl p-8 flex flex-col relative bg-neutral-900/[0.04] backdrop-blur-sm ${
        plan.isPopular ? 'border-2 border-steel-500 shadow-xl shadow-steel-900/30' : 'border border-white/10'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-steel-500 py-1.5 px-4 rounded-full flex items-center gap-1.5">
            <Star className="text-white h-4 w-4 fill-current" />
            <span className="text-white text-sm font-semibold">Most Popular</span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
        <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
        <div className="mt-6 flex items-baseline justify-center gap-x-1">
          <span className="text-5xl font-bold tracking-tight text-white tabular-nums">
            <NumberFlow
              value={value}
              format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 0 }}
            />
          </span>
          <span className="text-sm font-semibold text-slate-400">/ {period}</span>
        </div>
        <p className="text-xs text-neutral-500 mt-2">{billedNote}</p>

        <ul className="mt-8 space-y-3 text-sm leading-6 text-left text-slate-300">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-x-3">
              <Check className="h-6 w-5 flex-none text-steel-500" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <a
            href={(plan.links && plan.links[mode]) || plan.href || '#/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-full h-11 rounded-none px-8 text-sm font-semibold transition-colors ${
              plan.isPopular
                ? 'bg-steel-500 text-white hover:bg-steel-400'
                : 'border border-white/20 text-white hover:bg-white/10'
            }`}
          >
            {plan.buttonText}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
