import { GraduationCap, Heart, Zap, Users } from 'lucide-react';

const stats = [
  { icon: GraduationCap, label: 'NWTC Marketing Trained' },
  { icon: Heart, label: 'Locally Owned & Operated' },
  { icon: Zap, label: 'Modern Tech Stack' },
  { icon: Users, label: 'Small Business Focused' },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-max relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Visual card */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-navy-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-navy-900 to-navy-700 p-10 rounded-3xl text-white shadow-2xl">
              <div className="text-6xl font-extrabold text-accent mb-2">PWS</div>
              <p className="text-xl font-semibold mb-4">Local Roots. Modern Solutions.</p>
              <p className="text-slate-300 leading-relaxed mb-8">
                Born and raised in Door County, I built Peninsula Web Services to give
                local businesses the same digital edge as big-city brands — without the
                big-city price tag.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <span className="text-accent font-semibold uppercase tracking-wider text-sm">
            About
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 mt-3 mb-6 leading-tight">
            Local Roots. <span className="text-accent">Modern Solutions.</span>
          </h2>
          <div className="space-y-5 text-slate-700 text-lg leading-relaxed">
            <p>
              I'm a young, driven entrepreneur from the Sturgeon Bay area with a
              passion for helping the businesses I grew up around thrive in the
              digital age.
            </p>
            <p>
              After completing formal marketing coursework at <strong className="text-navy-900">NWTC</strong>,
              I combined those strategic insights with modern web development and
              AI expertise — so the sites I build don't just look good, they
              actually drive leads, calls, and bookings.
            </p>
            <p>
              When you work with Peninsula Web Services, you're not hiring a faceless
              agency. You're partnering with a neighbor who cares about your success
              and knows the Door County market inside and out.
            </p>
          </div>

          <a href="#contact" className="inline-flex items-center gap-2 mt-8 text-navy-900 font-semibold hover:text-accent transition-colors group">
            Let's build something great together
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
