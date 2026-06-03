import { useEffect, useState } from 'react';
import { Menu, X, Waves } from 'lucide-react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-navy-900/80 backdrop-blur-md shadow-lg shadow-navy-900/10'
          : 'bg-navy-900/40 backdrop-blur-sm'}`}
    >
      <nav className="container-max flex items-center justify-between px-6 md:px-10 py-4">
        <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg md:text-xl group">
          <Waves className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
          <span>Peninsula Web Services</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-slate-200 hover:text-accent font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-primary !py-2 !px-4 text-sm">
              Get a Quote
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-900/95 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <ul className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-slate-200 hover:text-accent font-medium transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full mt-2"
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
