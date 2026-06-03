import { Monitor, Bot, TrendingUp, Check } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Custom Web Design & Development',
    desc: 'Beautiful, mobile-first websites built for speed, accessibility, and search engines — so your business shines on every device.',
    bullets: ['Mobile-first & lightning fast', 'SEO-ready architecture', 'Conversion-focused layouts'],
  },
  {
    icon: Bot,
    title: 'AI Automation & Tools',
    desc: 'Smart AI integrations that save you hours every week — from customer chatbots to content generation and workflow automation.',
    bullets: ['24/7 AI chatbots', 'Automated customer service', 'Content & email generation'],
  },
  {
    icon: TrendingUp,
    title: 'Local Marketing & SEO',
    desc: 'NWTC-trained marketing strategy that gets your business found on Google by Door County locals and tourists alike.',
    bullets: ['Google Business optimization', 'Local keyword targeting', 'Conversion analytics'],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold uppercase tracking-wider text-sm">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 mt-3 mb-4">
            Services Built to Grow Your Business
          </h2>
          <p className="text-slate-600 text-lg">
            Three core services, one mission: turning your online presence into a real
            revenue engine.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, bullets }) => (
            <article
              key={title}
              className="group relative p-8 rounded-2xl bg-white border border-slate-200
                         shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-accent/40
                         transition-all duration-300"
            >
              <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-navy-700 to-navy-500
                              flex items-center justify-center shadow-lg group-hover:scale-110
                              group-hover:rotate-3 transition-transform duration-300">
                <Icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
