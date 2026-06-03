const services = [
  {
    n: '01',
    title: 'Web Design & Development',
    summary: 'Custom-built websites engineered for performance, SEO, and conversion.',
    items: ['Mobile-first architecture', 'Sub-second load targets', 'On-page SEO', 'Analytics & CRM integration'],
  },
  {
    n: '02',
    title: 'AI Automation & Tools',
    summary: 'Practical AI implementations that remove busywork and create leverage.',
    items: ['Customer-service chatbots', 'Workflow automations', 'Content & email generation', 'Custom internal tools'],
  },
  {
    n: '03',
    title: 'Local Marketing & SEO',
    summary: 'NWTC-trained strategy focused on the Door County market and tourism economy.',
    items: ['Google Business optimization', 'Local keyword research', 'Reviews & reputation', 'Seasonal campaign planning'],
  },
];

export default function Services() {
  return (
    <div className="page">
      <header className="grid md:grid-cols-12 gap-10 pb-20 border-b rule">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6">Services</p>
          <h1 className="display font-display text-5xl md:text-7xl">
            Three disciplines. One outcome — more customers.
          </h1>
        </div>
        <p className="md:col-span-5 text-stone-400 text-lg leading-relaxed md:pb-2">
          Engagements are scoped to the business, not packaged into tiers. Engineering,
          AI, and marketing — chosen and combined to fit the work in front of you.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-px bg-stone-800 border rule border-t-0">
        {services.map(({ n, title, summary, items }) => (
          <article key={n} className="bg-black p-10 flex flex-col">
            <p className="eyebrow mb-8">{n} / Service</p>
            <h2 className="text-3xl font-display mb-4">{title}</h2>
            <p className="text-stone-400 leading-relaxed mb-8">{summary}</p>
            <ul className="mt-auto space-y-3 pt-8 border-t rule">
              {items.map((it) => (
                <li key={it} className="text-sm text-stone-300 flex gap-3">
                  <span className="text-stone-600">—</span>{it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-12 border-t rule">
        <h3 className="text-2xl md:text-3xl font-display max-w-xl">
          Tell me about your business — I'll respond within 24 hours.
        </h3>
        <a href="#/contact" className="btn-light w-fit">Start a project</a>
      </div>
    </div>
  );
}
