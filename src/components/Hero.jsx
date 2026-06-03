import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-navy-500 text-white"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.15),transparent_50%)]" />

      <div className="relative container-max px-6 md:px-10 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur text-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Proudly based in Sturgeon Bay, WI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Empowering Sturgeon Bay Small Businesses with{' '}
            <span className="text-accent">Next-Gen Websites</span> &{' '}
            <span className="text-accent">AI</span>.
          </h1>

          <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl">
            A local, marketing-trained web partner building fast, conversion-focused
            websites for Door County restaurants, shops, and service businesses — designed
            to win more customers, not just look pretty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary group">
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="btn-secondary group">
              <Sparkles className="w-5 h-5 text-accent" />
              Explore Services
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
            <div>✓ Mobile-first design</div>
            <div>✓ SEO-optimized</div>
            <div>✓ AI-powered tools</div>
            <div>✓ Local Door County expertise</div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 inset-x-0 leading-[0]">
        <svg viewBox="0 0 1440 80" className="w-full h-12 md:h-20" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L0,80Z"
          />
        </svg>
      </div>
    </section>
  );
}
