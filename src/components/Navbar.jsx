import { useState } from 'react';
import { Menu, X, ChevronDown, Globe, Bot, MapPin, GraduationCap, Heart } from 'lucide-react';
import Logo from './Logo.jsx';

/**
 * Antigravity-style sticky nav: logo (left), centered links with flyout
 * mega-dropdowns (each with a short descriptor line above grouped items),
 * single prominent CTA on the right, hamburger on mobile.
 */
const productItems = [
  { icon: Globe, label: 'Custom Web Design', desc: 'Fast, mobile-first websites', href: '#/services' },
  { icon: Bot, label: 'AI Tools & Automation', desc: 'Chatbots and smart workflows', href: '#/services' },
  { icon: MapPin, label: 'Local SEO & Marketing', desc: 'Get found on Google', href: '#/services' },
];

const companyItems = [
  { icon: Heart, label: 'About', desc: 'Local roots. Modern solutions.', href: '#/about' },
  { icon: GraduationCap, label: 'Our Approach', desc: 'NWTC-trained, marketing-led', href: '#/about' },
];

export default function Navbar({ current }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null); // 'products' | 'company' | null

  const navLink = (path, label) =>
    `text-sm font-medium transition-colors ${
      current === path ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
    }`;

  const Dropdown = ({ id, label, items, path }) => (
    <li
      className="relative"
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(null)}
    >
      <button
        className={`inline-flex items-center gap-1 ${navLink(path, label)} py-2`}
        aria-haspopup="true"
        aria-expanded={hover === id}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${hover === id ? 'rotate-180' : ''}`} />
      </button>
      {hover === id && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[22rem]">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 animate-fade-in">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-400 mb-3 px-2">
              {id === 'products' ? 'Services we offer' : 'Get to know the studio'}
            </p>
            <ul className="space-y-1">
              {items.map(({ icon: Icon, label, desc, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-lg bg-teal-50 grid place-items-center shrink-0">
                      <Icon className="w-4 h-4 text-teal-700" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{label}</span>
                      <span className="block text-xs text-slate-500">{desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );

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

        {/* Center: nav with dropdowns */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <li><a href="#/" className={navLink('/', 'Home')}>Home</a></li>
          <Dropdown id="products" label="Services" items={productItems} path="/services" />
          <Dropdown id="company" label="Company" items={companyItems} path="/about" />
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
            <li><a href="#/" onClick={() => setOpen(false)} className="block py-2.5 font-medium text-slate-700">Home</a></li>
            <li className="pt-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 pb-1">Services</p>
              {productItems.map((it) => (
                <a key={it.label} href={it.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-slate-700">{it.label}</a>
              ))}
            </li>
            <li className="pt-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 pb-1">Company</p>
              {companyItems.map((it) => (
                <a key={it.label} href={it.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-slate-700">{it.label}</a>
              ))}
            </li>
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
