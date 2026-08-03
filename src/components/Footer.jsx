import Logo from './Logo.jsx';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Web Design', href: '#/services' },
      { label: 'AI Tools', href: '#/services' },
      { label: 'Local SEO', href: '#/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#/about' },
      { label: 'Approach', href: '#/about' },
      { label: 'Contact', href: '#/contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '(920) 370-9543', href: 'tel:+19203709543' },
      { label: 'dcpeninsulaweb@gmail.com', href: 'mailto:dcpeninsulaweb@gmail.com' },
      { label: 'Sturgeon Bay, WI', href: '#' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      {/* Top: brand tagline + nav rows */}
      <div className="container-x py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-5">
            <Logo size={32} />
            <span className="font-wordmark font-semibold text-white text-xl tracking-[0.12em] uppercase">Peninsula Web Services</span>
          </div>
          <p className="font-display text-2xl md:text-3xl font-bold text-white leading-tight max-w-md">
            High-performance websites &amp; AI tools for modern businesses.
          </p>
          <p className="text-neutral-500 mt-4 text-sm">Design. Development. Results.</p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-400 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-neutral-300 hover:text-white transition-colors break-all">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: legal bar */}
      <div className="border-t border-neutral-800">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {year} Peninsula Web Services. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
            <li><span className="text-slate-400">Made in Wisconsin</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
