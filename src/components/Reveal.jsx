import useReveal from '../hooks/useReveal.js';

/**
 * Wraps children in a fade-up-on-scroll animation.
 * `delay` (ms) staggers grouped items. `as` sets the element tag.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
