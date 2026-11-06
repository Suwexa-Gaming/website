import Image from "next/image";
import { StrikeTable } from "@/components/game/StrikeTable";
import { SectionLabel } from "@/components/ui/primitives";

function Discipline({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <div data-reveal>
      <p className="eyebrow text-gold">{index}</p>
      <h3 className="display display-h3 mt-3">{title}</h3>
      <div className="lede mt-5 max-w-md">{children}</div>
    </div>
  );
}

const RULES = [
  { step: "Queen pocketed", note: "Worth the most, and not yet yours." },
  { step: "Cover on the next strike", note: "Sink one of your own to claim her." },
  { step: "Miss, and she returns", note: "Back to the centre. The table remembers." },
];

export function Showcase() {
  return (
    <section aria-labelledby="showcase-title" className="section shell">
      <SectionLabel index="04">What we work on</SectionLabel>
      <h2 id="showcase-title" className="display display-xl mt-12 max-w-[12ch] md:mt-16" data-reveal>
        One world, taken apart.
      </h2>
      <p className="lede mt-7 max-w-xl" data-reveal>
        A game is six crafts pretending to be one thing. These are the ones we care about, shown through our own work.
      </p>

      <div className="mt-20 space-y-24 md:mt-32 md:space-y-40">
        {/* Game design: the plan view of the world in our key art. */}
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-6">
          <figure className="cut-br relative aspect-[10/7] overflow-hidden md:col-span-8" data-reveal="image">
            <Image
              src="/images/studio/survey.webp"
              alt="A survey sheet of invented terrain: fine contour lines, with gold index contours and a light grid over black."
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="md:col-span-4">
            <Discipline index="A" title="Game design">
              Before a world looks like anything, it is a plan: where you begin, what stands in the way, and why you would
              keep walking.
            </Discipline>
          </div>
        </div>

        {/* Interactive experiences: the reader plays. */}
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:order-2 md:col-span-5 md:col-start-8">
            <Discipline index="B" title="Interactive experiences">
              We would rather show you than tell you. This table is a small sketch made for this page, simpler than any
              game of ours. Try it.
            </Discipline>
          </div>
          <div className="md:order-1 md:col-span-6" data-reveal>
            <StrikeTable />
          </div>
        </div>

        {/* Gameplay systems: a real rule, as a chain of consequences. */}
        <div className="grid gap-8 border-y border-line py-12 md:grid-cols-12 md:gap-6 md:py-20">
          <div className="md:col-span-4">
            <Discipline index="C" title="Gameplay systems">
              A good rule creates a story. In carrom, the queen has been making them for generations.
            </Discipline>
          </div>
          <ol className="md:col-span-7 md:col-start-6" data-reveal>
            {RULES.map((rule, i) => (
              <li key={rule.step} className="flex gap-5 border-b border-line py-6 last:border-b-0 md:gap-8">
                <span
                  aria-hidden="true"
                  className={`mt-1 block h-7 w-7 shrink-0 rounded-full ${i === 0 ? "bg-[#c23a30]" : "shadow-[inset_0_0_0_1px_var(--color-gold)]"}`}
                />
                <span>
                  <span className="display display-md block">{rule.step}</span>
                  <span className="voice mt-2 block text-xl text-ash md:text-2xl">{rule.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile gaming and user experience: the phone in the hand. */}
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <Discipline index="D" title="Mobile gaming">
              The phone is a serious place to play. Carrom Crest needs no account and no connection, and it puts friends
              on one table with nothing more than a shared Wi-Fi and a five-digit code.
            </Discipline>
            <div className="mt-16 md:mt-28">
              <Discipline index="E" title="User experience">
                Every shot begins with a question: where will this go? The compass guide answers it, then gets out of the
                way. Turn it off when you no longer need it.
              </Discipline>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7 md:gap-6">
            <figure className="relative aspect-[9/16] overflow-hidden bg-ink-2" data-reveal="image">
              <Image
                src="/images/carrom-crest/match-table.webp"
                alt="Carrom Crest on a phone: a match with the striker on the baseline and the aim guide showing."
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </figure>
            <figure
              className="relative mt-12 aspect-[9/16] overflow-hidden bg-ink-2 md:mt-24"
              data-reveal="image"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <Image
                src="/images/carrom-crest/friend-room.webp"
                alt="Carrom Crest on a phone: a friend room with its five-digit code and three players."
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>

        {/* Game technology: the key art with its lighting stripped away. */}
        <div className="relative isolate overflow-hidden">
          <figure className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/10]" data-reveal="image">
            <Image
              src="/images/studio/wire.webp"
              alt="The monolith scene as an engineering view: gold edge lines and scan lines on black, over a wire grid of terrain."
              fill
              sizes="100vw"
              className="object-cover object-[60%_center]"
            />
          </figure>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent pt-32">
            <Discipline index="F" title="Game technology">
              Our work runs on open tools. Carrom Crest is built with the Godot engine, with its own deterministic physics
              and a computer opponent that tests candidate shots against the real rules.
            </Discipline>
          </div>
        </div>
      </div>
    </section>
  );
}
