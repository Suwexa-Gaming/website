import Image from "next/image";
import type { GameImage } from "@/content/games";

/** A horizontal run of portrait screens that bleeds off the right edge. */
export function ScreenRail({ screens }: { screens: GameImage[] }) {
  return (
    <div
      data-scroll-x
      tabIndex={0}
      role="group"
      aria-label="Screens from the game. Scroll sideways to see more."
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-5 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin] md:gap-6"
    >
      {screens.map((screen) => (
        <figure key={screen.src} className="w-[66vw] max-w-[19rem] shrink-0 snap-center md:w-[22vw] md:max-w-[22rem] md:snap-start">
          <div className="relative aspect-[9/16] overflow-hidden bg-ink-2">
            <Image src={screen.src} alt={screen.alt} fill sizes="(min-width: 768px) 22vw, 66vw" className="object-cover" />
          </div>
          {screen.caption ? <figcaption className="mt-3 font-text text-[0.92rem] text-ash">{screen.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
