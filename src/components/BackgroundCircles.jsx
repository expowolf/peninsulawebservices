import { motion } from 'framer-motion';

/**
 * Rotating concentric circles + animated grid backdrop. Converted from the
 * provided .tsx to .jsx; `clsx` replaced with template strings (no extra
 * dependency). Single brand-rose variant baked in.
 */

const VARIANT = {
  border: ['border-rose-600/60', 'border-rose-400/50', 'border-slate-300/30'],
  gradient: 'from-rose-600/30',
};

function AnimatedGrid() {
  return (
    <motion.div
      className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    >
      <div className="h-full w-full opacity-20 [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)]" />
    </motion.div>
  );
}

export default function BackgroundCircles({
  title,
  description,
  className = '',
  // contained = true → fills its own section; false → h-screen
  contained = true,
  // backdrop = true → no text, transparent bg, pointer-events-none.
  // Use it as an absolutely-positioned ambient backdrop behind real content.
  backdrop = false,
}) {
  const wrapperClass = backdrop
    ? `absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`
    : `relative flex w-full items-center justify-center overflow-hidden bg-white ${
        contained ? 'min-h-[72vh]' : 'h-screen'
      } ${className}`;

  return (
    <div className={wrapperClass} aria-hidden={backdrop || undefined}>
      <AnimatedGrid />

      <motion.div className="absolute h-[420px] w-[420px] md:h-[480px] md:w-[480px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute inset-0 rounded-full border-2 bg-gradient-to-br to-transparent ${VARIANT.border[i]} ${VARIANT.gradient}`}
            animate={{
              rotate: 360,
              scale: [1, 1.05 + i * 0.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {!backdrop && (title || description) && (
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title && (
            <h1 className="font-display font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-transparent">
              {title}
            </h1>
          )}
          {description && (
            <motion.p
              className="mt-6 text-lg md:text-xl text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Soft brand glow */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,18,60,0.18),transparent_70%)] blur-[100px]" />
      </div>
    </div>
  );
}
