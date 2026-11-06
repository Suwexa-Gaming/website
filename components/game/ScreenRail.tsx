"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GameImage } from "@/content/games";

/** A horizontal run of portrait screens that bleeds off the edge, with controls for a mouse. */
export function ScreenRail({ screens }: { screens: GameImage[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEnds({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const move = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <div className="group/rail relative">
      <div
        ref={rail}
        data-scroll-x
        tabIndex={0}
        role="group"
        aria-label="Screens from the game. Scroll sideways to see more."
        onScroll={measure}
        className="flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-5 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {screens.map((screen, index) => (
          <figure key={screen.src} className="w-[66vw] max-w-[19rem] shrink-0 snap-center md:w-[22vw] md:max-w-[22rem] md:snap-start">
            <div className="relative aspect-[9/16] overflow-hidden bg-ink-2">
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                sizes="(min-width: 768px) 22vw, 66vw"
                loading={index < 4 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-[1.2s] ease-cinema hover:scale-[1.025]"
              />
            </div>
            {screen.caption ? <figcaption className="mt-3 font-text text-[0.92rem] text-ash">{screen.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      <div className="shell mt-3 hidden items-center justify-end gap-2 md:flex">
        {([
          [-1, "Previous screens", ends.start, "M9 1L2 8l7 7"],
          [1, "More screens", ends.end, "M2 1l7 7-7 7"],
        ] as const).map(([direction, label, disabled, path]) => (
          <button
            key={direction}
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={() => move(direction)}
            className="flex h-12 w-12 items-center justify-center text-bone shadow-[inset_0_0_0_1px_rgba(244,244,242,0.25)] transition-colors duration-300 hover:bg-gold hover:text-ink disabled:pointer-events-none disabled:opacity-30"
          >
            <svg viewBox="0 0 11 16" className="h-3.5 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d={path} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
