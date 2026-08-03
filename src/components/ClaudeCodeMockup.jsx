/**
 * Stylized "Claude Code" session: a chat prompt on the left, a live editor
 * writing website code on the right, and a mini rendered preview. Pure
 * markup + Tailwind (no external image) so it renders instantly and stays
 * crisp inside the scroll card. Subtle blinking cursor keeps it alive.
 */
const K = (c) => <span className="text-fuchsia-400">{c}</span>;       // keyword
const T = (c) => <span className="text-steel-400">{c}</span>;          // tag
const A = (c) => <span className="text-steel-300">{c}</span>;         // attr
const S = (c) => <span className="text-emerald-300">{c}</span>;       // string
const P = (c) => <span className="text-zinc-500">{c}</span>;          // punctuation
const F = (c) => <span className="text-sky-300">{c}</span>;           // fn

const CODE_LINES = [
  <>{K('export default function')} {F('Hero')}() {'{'}</>,
  <>{'  '}{K('return')} (</>,
  <>{'    '}{P('<')}{T('section')} {A('className')}={S('"hero"')}{P('>')}</>,
  <>{'      '}{P('<')}{T('h1')}{P('>')}Websites that mean business.{P('</')}{T('h1')}{P('>')}</>,
  <>{'      '}{P('<')}{T('p')}{P('>')}Designed to convert visitors.{P('</')}{T('p')}{P('>')}</>,
  <>{'      '}{P('<')}{T('Button')} {A('variant')}={S('"primary"')}{P('>')}</>,
  <>{'        '}Get a Quote</>,
  <>{'      '}{P('</')}{T('Button')}{P('>')}<span className="inline-block w-1.5 h-3.5 bg-steel-400 ml-0.5 align-middle animate-pulse" /></>,
  <>{'    '}{P('</')}{T('section')}{P('>')}</>,
  <>{'  '});</>,
  <>{'}'}</>,
];

export default function ClaudeCodeMockup() {
  return (
    <div className="h-full w-full flex flex-col bg-zinc-900 text-zinc-200 text-left">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 h-9 bg-zinc-800/80 border-b border-zinc-700 shrink-0">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-steel-400/80" />
        <span className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-3 text-[11px] text-zinc-400 font-mono">claude-code — building landing-page.jsx</span>
      </div>

      <div className="flex-1 grid md:grid-cols-2 min-h-0">
        {/* Chat pane */}
        <div className="flex flex-col gap-3 p-4 border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden">
          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-zinc-700 grid place-items-center text-[10px] font-bold shrink-0">You</span>
            <p className="text-[13px] text-zinc-300 leading-relaxed bg-zinc-800/60 rounded-xl rounded-tl-sm px-3 py-2">
              Build a modern landing page hero with a headline, CTA, and pricing section.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-md bg-steel-500 grid place-items-center text-[10px] font-bold shrink-0">✦</span>
            <div className="text-[13px] leading-relaxed">
              <p className="text-zinc-300 mb-2">Building your landing page now.</p>
              <ul className="space-y-1.5 font-mono text-[12px]">
                <li className="text-emerald-400">✓ Created <span className="text-zinc-300">Hero.jsx</span></li>
                <li className="text-emerald-400">✓ Added responsive <span className="text-zinc-300">Pricing.jsx</span></li>
                <li className="text-emerald-400">✓ Wired CTA → contact form</li>
                <li className="text-zinc-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-steel-400 mr-1.5 align-middle animate-pulse" />
                  Optimizing images &amp; SEO…
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Editor pane */}
        <div className="flex flex-col min-h-0 bg-[#1e1e2e]">
          <div className="flex items-center gap-3 px-4 h-8 bg-zinc-800/50 border-b border-zinc-800 shrink-0">
            <span className="text-[11px] font-mono text-steel-400 border-b-2 border-steel-400 h-full flex items-center">Hero.jsx</span>
            <span className="text-[11px] font-mono text-zinc-500">Pricing.jsx</span>
          </div>
          <div className="flex-1 p-4 text-[11.5px] leading-[1.8] font-mono overflow-hidden">
            {CODE_LINES.map((line, i) => (
              <div key={i} className="whitespace-pre flex">
                <span className="text-zinc-600 select-none w-6 text-right mr-3 shrink-0">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
