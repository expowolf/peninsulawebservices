import { ArrowRight, Globe, Bot, MapPin, Star } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import BuildAnimation from '../components/BuildAnimation.jsx';
import GlobeAnimation from '../components/GlobeAnimation.jsx';
import TrustBar from '../components/TrustBar.jsx';
import { RestaurantImage, ShopImage } from '../components/ImagePlaceholder.jsx';

const services = [
  { icon: Globe, title: 'Web Design', text: 'Fast, mobile-friendly websites that look great on every screen.' },
  { icon: Bot, title: 'AI Tools', text: 'Chatbots and automation that save you hours every week.' },
  { icon: MapPin, title: 'Local SEO', text: 'Help customers across Door County find you on Google.' },
];

const examples = [
  { Img: RestaurantImage, title: 'Restaurants', text: 'Menus, hours, and reservations — all online and up to date.', bg: 'bg-orange-50' },
  { Img: ShopImage, title: 'Shops & Services', text: 'Show off your work and turn browsers into customers.', bg: 'bg-violet-50' },
];

export default function Home() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-cream">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
          <Reveal>
            <span className="eyebrow">Sturgeon Bay · Door County, WI</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-6">
              Websites that bring{' '}
              <span className="text-teal-700">local customers</span> to your door.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              We build fast, modern websites for the restaurants, shops, and services
              that make Door County special — designed to get you found and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#/contact" className="btn-primary group">
                Get a Free Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#/services" className="btn-secondary">See What We Do</a>
            </div>
            <div className="flex items-center gap-2 mt-8 text-sm text-slate-500">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span>Trusted by local Door County businesses</span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <BuildAnimation />
          </Reveal>
        </div>
      </section>

      {/* ---------- Trust & Authority strip ---------- */}
      <TrustBar />

      {/* ---------- Services ---------- */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl mb-12">
            <span className="eyebrow">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything your business needs to win online.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="card h-full p-8">
                  <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-slate-600 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Examples ---------- */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="container-x">
          <Reveal className="max-w-2xl mb-12">
            <span className="eyebrow">Who We Help</span>
            <h2 className="text-3xl md:text-4xl font-bold">Built for local businesses like yours.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {examples.map(({ Img, title, text, bg }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="card overflow-hidden">
                  <div className={`h-52 ${bg} overflow-hidden`}><Img /></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <p className="text-slate-600">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Local reach (globe) ---------- */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <GlobeAnimation />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Local Reach, World-Class Tech</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rooted in Door County. Built on modern web technology.
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              We're right here in Sturgeon Bay — but the websites we build use the same
              fast, modern tools that power the world's best brands. Your customers get a
              premium experience, and you get a partner who actually picks up the phone.
            </p>
            <ul className="space-y-2.5">
              {['Fast, global content delivery', 'Mobile-first & accessible', 'Found on Google across the peninsula'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl bg-teal-700 text-white px-8 py-14 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to grow your business?
              </h2>
              <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
                Tell us about your business and get a free, no-pressure quote within 24 hours.
              </p>
              <a href="#/contact" className="btn bg-white text-teal-700 border-white hover:bg-teal-50">
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
