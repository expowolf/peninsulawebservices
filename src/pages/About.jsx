import { TeamImage } from '../components/ImagePlaceholder.jsx';

export default function About() {
  return (
    <div className="page">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About Us</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Peninsula Web Services is a small web studio in Sturgeon Bay, Wisconsin. We build websites and tools for local small businesses — restaurants, shops, services, and anyone trying to grow their business online.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Our founder completed formal marketing training at <strong>NWTC</strong>, so every website we build is designed not just to look good, but to <strong>drive customers</strong>. We combine modern web technology with marketing strategy.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            We're local. We understand Door County. And we care about your success — because your success is our success.
          </p>
        </div>
        <div className="h-96 bg-slate-100 rounded overflow-hidden">
          <TeamImage />
        </div>
      </div>

      <div className="bg-blue-50 p-12 rounded mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Why work with us?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Local & Personal</h3>
            <p className="text-slate-700">You talk to the person building your website — not an account manager in another state.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Marketing-Driven</h3>
            <p className="text-slate-700">NWTC training means we build for conversions, not just looks.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Modern & Fast</h3>
            <p className="text-slate-700">Your site works on phones, loads fast, and ranks on Google.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Door County Focus</h3>
            <p className="text-slate-700">We understand the local market and seasonal tourism economy.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Let's work together</h2>
        <a href="#/contact" className="btn-primary">Start a Project</a>
      </div>
    </div>
  );
}
