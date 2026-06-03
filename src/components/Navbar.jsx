import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';

const links = [
  { href: '#/', label: 'Home', path: '/' },
  { href: '#/services', label: 'Services', path: '/services' },
  { href: '#/about', label: 'About', path: '/about' },
  { href: '#/contact', label: 'Contact', path: '/contact' },
];

export default function Navbar({ current }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container-x flex items-center justify-between h-16">
        <a href="#/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="hidden sm:block font-bold text-teal-700 text-sm">Peninsula Web Services</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.path}>
              <a
                href={l.href}
                className={`font-medium text-sm transition ${
                  current === l.path ? 'text-teal-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#/contact" className="btn-primary">
              Get a Quote
            </a>
          </li>
        </ul>

        <button onClick={() => setOpen((v) => !v)} className="md:hidden text-slate-700 p-1">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="container-x py-4 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.path}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-medium text-slate-700">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
