import Logo from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t rule">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <Logo size={32} />
            <span className="text-sm font-medium uppercase tracking-[0.22em]">Peninsula Web Services</span>
          </div>
          <p className="text-stone-400 max-w-md text-sm leading-relaxed">
            Independent web studio in Sturgeon Bay, Wisconsin. Websites, AI tooling,
            and local marketing for businesses across Door County.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><a href="#/" className="hover:text-stone-100">Home</a></li>
            <li><a href="#/services" className="hover:text-stone-100">Services</a></li>
            <li><a href="#/about" className="hover:text-stone-100">About</a></li>
            <li><a href="#/contact" className="hover:text-stone-100">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><a href="tel:+19203709543" className="hover:text-stone-100">(920) 370-9543</a></li>
            <li><a href="mailto:dcpeninsulaweb@gmail.com" className="hover:text-stone-100 break-all">dcpeninsulaweb@gmail.com</a></li>
            <li>Sturgeon Bay, WI</li>
          </ul>
        </div>
      </div>
      <div className="border-t rule">
        <div className="container-x py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs uppercase tracking-[0.22em] text-stone-500">
          <p>© {year} Peninsula Web Services</p>
          <p>Door County, Wisconsin</p>
        </div>
      </div>
    </footer>
  );
}
