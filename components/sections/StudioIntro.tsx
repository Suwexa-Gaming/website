import Image from "next/image";
import { SectionLabel } from "@/components/ui/primitives";

export function StudioIntro() {
  return (
    <section aria-labelledby="intro-title" className="section shell">
      <SectionLabel index="01">The studio</SectionLabel>

      <h2 id="intro-title" className="display display-lg mt-12 md:mt-16" data-reveal>
        Play is our medium.
        <br />
        <span className="text-gold">Creativity</span> is our engine.
      </h2>

      <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-6">
        <figure className="cut-br relative aspect-[16/11] overflow-hidden lg:col-span-7" data-reveal="image">
          <Image
            src="/images/studio/fracture.webp"
            alt="Close view of the monolith's fracture: black slabs edged in gold, with light spilling between them."
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="parallax object-cover"
          />
        </figure>

        <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9" data-reveal>
          <p className="voice text-[1.9rem] text-bone md:text-[2.5rem]">We make games. That is the whole of it, and it is plenty.</p>
          <p className="lede mt-7">
            Suwexa Gaming is an independent studio. We design and build our own games, from the first rule to the last
            sound, and we keep the things that make a game worth returning to at the centre of the work.
          </p>
          <p className="lede mt-5">
            We started with carrom, because a game of touch leaves nowhere to hide. Next comes whatever deserves the same
            care.
          </p>
        </div>
      </div>
    </section>
  );
}
