const services = [
  {
    title: 'Custom Web Design',
    desc: 'We build websites from scratch for your business — not templates, not builders. Fast, mobile-friendly, and optimized for Google.',
    features: ['Mobile-first', 'Fast load times', 'SEO-ready', 'Easy to maintain'],
  },
  {
    title: 'AI & Automation',
    desc: 'Smart tools that handle customer questions, send emails, and save you hours every week doing the boring stuff.',
    features: ['Chatbots', 'Email automation', 'Lead capture', 'Custom tools'],
  },
  {
    title: 'Local Marketing',
    desc: 'We know Door County. Help customers find you on Google Maps, manage your reviews, and plan campaigns that work.',
    features: ['Google optimization', 'Local SEO', 'Reviews management', 'Analytics'],
  },
];

export default function Services() {
  return (
    <div className="page">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Services</h1>
      <p className="text-xl text-slate-600 mb-16 max-w-3xl">
        Three core services. All focused on one thing: helping your business win more customers online.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map(({ title, desc, features }) => (
          <div key={title} className="bg-white p-8 rounded border border-slate-200 shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">{title}</h3>
            <p className="text-slate-700 mb-6 leading-relaxed">{desc}</p>
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="text-slate-700 flex gap-2">
                  <span className="text-blue-700">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 p-10 rounded text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to grow?</h2>
        <p className="text-slate-700 mb-6">Let's talk about what your business needs.</p>
        <a href="#/contact" className="btn-primary">Get a Free Quote</a>
      </div>
    </div>
  );
}
