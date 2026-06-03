import { Waves, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="container-max px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Waves className="w-5 h-5 text-accent" />
            Peninsula Web Services
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Modern websites, AI automation, and local marketing for the small
            businesses that make Door County special.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-accent text-sm font-semibold">
            <MapPin className="w-4 h-4" />
            Proudly serving Door County
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-accent transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+19203709543" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> (920) 370-9543
              </a>
            </li>
            <li>
              <a href="mailto:dcpeninsulaweb@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors break-all">
                <Mail className="w-4 h-4 flex-shrink-0" /> dcpeninsulaweb@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Sturgeon Bay, WI
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>© {year} Peninsula Web Services. All rights reserved.</p>
          <p>Built with care in Sturgeon Bay, WI 🌊</p>
        </div>
      </div>
    </footer>
  );
}
