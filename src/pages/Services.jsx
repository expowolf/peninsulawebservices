import { Globe, Bot, MapPin, Check, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';

const services = [
  {
    icon: Globe,
    title: 'Custom Web Design',
    desc: 'We build websites from scratch for your business — not templates. Fast, mobile-friendly, and optimized for Google.',
    features: ['Mobile-first design', 'Fast load times', 'SEO-ready', 'Easy to maintain'],
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    desc: 'Smart tools that answer customer questions, send emails, and handle the busywork so you can focus on your business.',
    features: ['Customer chatbots', 'Email automation', 'Lead capture', 'Custom tools'],
  },
  {
    icon: MapPin,
    title: 'Local Marketing',
    desc: 'We know Door County. Get found on Google Maps, manage your reviews, and plan campaigns that actually work.',
    features: ['Google optimization', 'Local SEO', 'Reviews management', 'Analytics'],
  },
];

export default function Services() {
  return (
    <div className="page">
      <Reveal className="max-w-3xl mb-14">
        <span className="eyebrow">Services</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Three services. One goal: more customers.
        </h1>
        <p className="text-lg text-neutral-400">
          Everything we do is focused on helping your local business get found and grow online.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, desc, features }, i) => (
          <Reveal key={title} delay={i * 100}>
            <div className="card h-full p-8 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-steel-500/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-steel-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">{title}</h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">{desc}</p>
              <ul className="mt-auto space-y-2.5 pt-6 border-t border-neutral-800">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-neutral-300">
                    <Check className="w-4 h-4 text-steel-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 bg-steel-500/10 rounded-2xl p-10 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Not sure what you need?</h2>
          <p className="text-neutral-400 mb-6 max-w-lg mx-auto">
            That's okay. Reach out and we'll figure out the right fit for your business together.
          </p>
          <a href="#/contact" className="btn-primary group">
            Get a Free Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </div>
  );
}
