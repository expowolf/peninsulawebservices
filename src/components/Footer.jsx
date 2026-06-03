import Logo from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container-x py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Logo size={28} />
            <span className="font-bold">Peninsula Web Services</span>
          </div>
          <p className="text-slate-300 text-sm">
            Building websites for Door County's small businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#/" className="hover:text-white">Home</a></li>
            <li><a href="#/services" className="hover:text-white">Services</a></li>
            <li><a href="#/about" className="hover:text-white">About</a></li>
            <li><a href="#/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="tel:+19203709543" className="hover:text-white">(920) 370-9543</a></li>
            <li><a href="mailto:dcpeninsulaweb@gmail.com" className="hover:text-white">dcpeninsulaweb@gmail.com</a></li>
            <li>Sturgeon Bay, WI</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 bg-slate-900">
        <div className="container-x py-4 text-center text-sm text-slate-400">
          <p>© {year} Peninsula Web Services. Local roots, modern solutions.</p>
        </div>
      </div>
    </footer>
  );
}
