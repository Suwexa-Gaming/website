import Image from "next/image";

/** A pause between chapters: the art takes the whole screen, with one line over it. */
export function Interlude() {
  return (
    <section aria-label="A studio statement" className="relative isolate flex min-h-[min(100svh,56rem)] items-end overflow-hidden">
      <Image
        src="/images/studio/crystals.webp"
        alt="Amber crystals erupting from a glowing fracture in a black stone monolith, close up."
        fill
        sizes="max(100vw, 178vh)"
        quality={85}
        className="parallax -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/25 to-ink/70" />
      <div className="shell pt-40 pb-14 md:pb-20">
        <p className="display display-lg max-w-[17ch]" data-reveal>
          Every world starts with <span className="text-gold">one good rule.</span>
        </p>
      </div>
    </section>
  );
}
