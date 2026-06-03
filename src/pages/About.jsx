const facts = [
  ['Founded', '2025'],
  ['Based', 'Sturgeon Bay, WI'],
  ['Training', 'NWTC Marketing'],
  ['Focus', 'Door County SMBs'],
];

export default function About() {
  return (
    <div className="page">
      <header className="pb-20 border-b rule">
        <p className="eyebrow mb-6">About</p>
        <h1 className="display font-display text-5xl md:text-7xl max-w-4xl">
          Local roots. Modern solutions.
        </h1>
      </header>

      <section className="grid md:grid-cols-12 gap-12 py-20 border-b rule">
        <div className="md:col-span-7 space-y-6 text-stone-300 text-lg leading-relaxed">
          <p>
            Peninsula Web Services is an independent studio founded by a young entrepreneur from the
            Sturgeon Bay area — built to give the small businesses of Door County the same digital
            edge as much larger brands.
          </p>
          <p>
            Formal marketing training at <span className="text-stone-100">NWTC</span> shapes the
            strategy behind every project: messaging, conversion, and local SEO are designed in
            from day one, not bolted on after launch.
          </p>
          <p>
            The result is websites and AI tooling that don't just look refined — they generate
            calls, bookings, and revenue for the people who run Main Street.
          </p>
        </div>
        <aside className="md:col-span-5">
          <div className="border rule">
            {facts.map(([k, v], i) => (
              <div key={k} className={`flex justify-between px-6 py-5 ${i ? 'border-t rule' : ''}`}>
                <span className="eyebrow">{k}</span>
                <span className="text-stone-100 text-sm font-medium">{v}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="py-20 grid md:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow mb-6">Approach</p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">Engineering meets strategy.</h2>
          <p className="text-stone-400 leading-relaxed">
            Every engagement starts with the question most agencies skip: what is this website
            supposed to make happen? The answer drives the architecture, copy, and technology.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-6">Promise</p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">You'll talk to the person building it.</h2>
          <p className="text-stone-400 leading-relaxed">
            No account managers, no offshore handoffs, no surprises. Direct communication and
            in-person meetings — the way doing business in Door County is supposed to work.
          </p>
        </div>
      </section>
    </div>
  );
}
