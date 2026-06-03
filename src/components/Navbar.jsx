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
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b rule">
      <nav className="container-x flex items-center justify-between h-20">
        <a href="#/" className="flex items-center gap-3 group">
          <Logo />
          <span className="hidden sm:block text-sm font-medium tracking-[0.22em] uppercase text-stone-100">
            Peninsula <span className="text-stone-500">/</span> Web Services
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.path}>
              <a
                href={l.href}
                className={`text-xs uppercase tracking-[0.22em] transition-colors ${
                  current === l.path ? 'text-stone-100' : 'text-stone-500 hover:text-stone-100'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#/contact" className="btn-light !py-2 !px-4 text-[11px]">
              Start a project
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-stone-100 p-2 border rule"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t rule bg-black">
          <ul className="container-x py-6 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.path}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm uppercase tracking-[0.22em] ${
                    current === l.path ? 'text-stone-100' : 'text-stone-400'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
