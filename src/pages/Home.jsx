import { HeroImage, RestaurantImage, ShopImage } from '../components/ImagePlaceholder.jsx';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-50 py-12 md:py-20">
        <div className="container-x grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Your business deserves a great website.
            </h1>
            <p className="text-lg text-slate-700 mb-8">
              We build fast, modern websites that help restaurants, shops, and local services
              in Door County get found and win more customers.
            </p>
            <div className="flex gap-4">
              <a href="#/contact" className="btn-primary">Get Started</a>
              <a href="#/services" className="btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="h-64 md:h-80">
            <HeroImage />
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-700 pl-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Web Design</h3>
              <p className="text-slate-700">
                Beautiful, fast websites that work on phones, tablets, and desktops.
              </p>
            </div>
            <div className="border-l-4 border-blue-700 pl-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Tools</h3>
              <p className="text-slate-700">
                Chatbots, automation, and smart tools that save you time.
              </p>
            </div>
            <div className="border-l-4 border-blue-700 pl-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Local SEO</h3>
              <p className="text-slate-700">
                Help customers in Door County find you on Google.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-x">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">For All Kinds of Businesses</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="h-48 bg-orange-50 rounded mb-4 overflow-hidden">
                <RestaurantImage />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Restaurants</h3>
              <p className="text-slate-600 mt-2">Menus, reservations, reviews — online.</p>
            </div>
            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="h-48 bg-purple-50 rounded mb-4 overflow-hidden">
                <ShopImage />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Shops & Services</h3>
              <p className="text-slate-600 mt-2">Show off your work, get discovered.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
