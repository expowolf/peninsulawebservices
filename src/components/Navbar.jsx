import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';

/**
 * Sticky nav: logo (left), centered plain links (no dropdowns),
 * single prominent CTA on the right, hamburger on mobile.
 */
const links = [
  { href: '#/', label: 'Home', path: '/' },
  { href: '#/services', label: 'Services', path: '/services' },
  { href: '#/about', label: 'About', path: '/about' },
];

export default function Navbar({ current }) {
  const [open, setOpen] = useState(false);

  const navLink = (path) =>
    `text-sm font-medium transition-colors ${
      current === path ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100">
      <nav className="container-x flex items-center justify-between h-16">
        {/* Left: logo + wordmark */}
        <a href="#/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="hidden sm:block font-display font-bold text-slate-900 text-sm">
            Peninsula Web Services
          </span>
        </a>

        {/* Center: plain links */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.path}>
              <a href={l.href} className={navLink(l.path)}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Right: single CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-slate-700 p-1"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <ul className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.path}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 font-medium text-slate-700">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href="#/contact" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 w-full px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
