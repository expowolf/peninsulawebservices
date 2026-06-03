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
    <footer className="bg-white border-t border-slate-100">
      {/* Top: brand tagline + nav rows */}
      <div className="container-x py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-5">
            <Logo size={32} />
            <span className="font-display font-bold text-slate-900">Peninsula Web Services</span>
          </div>
          <p className="font-display text-2xl md:text-3xl font-bold text-slate-900 leading-tight max-w-md">
            Premium websites for the businesses of Door County.
          </p>
          <p className="text-slate-500 mt-4 text-sm">Local roots. Modern solutions.</p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-400 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-700 hover:text-slate-900 transition-colors break-all">
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
      <div className="border-t border-slate-100">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} Peninsula Web Services. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
            <li><a href="#" className="hover:text-slate-900">Terms</a></li>
            <li><span className="text-slate-400">Door County · Wisconsin</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
