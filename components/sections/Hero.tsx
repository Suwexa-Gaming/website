import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { Arrow } from "@/components/ui/primitives";
import { games, statusLabel } from "@/content/games";
import { articles, formatDate } from "@/content/news";

const ALT =
  "A tall black monolith split into drifting slabs, lit from behind by a low golden sun, standing on a dark plain before a mountain ridge.";

function HeroArt() {
  const common = { alt: ALT, sizes: "100vw", priority: true, quality: 85 };
  const { props: wide } = getImageProps({ ...common, src: "/images/studio/hero-wide.webp", width: 2560, height: 1440 });
  const { props: tall } = getImageProps({ ...common, src: "/images/studio/hero-tall.webp", width: 1170, height: 2080 });
  return (
    <picture>
      <link rel="preload" as="image" media="(min-aspect-ratio: 6/5)" imageSrcSet={wide.srcSet} imageSizes="max(100vw, 178vh)" fetchPriority="high" />
      <link rel="preload" as="image" media="(max-aspect-ratio: 6/5)" imageSrcSet={tall.srcSet} imageSizes="100vw" fetchPriority="high" />
      <source media="(min-aspect-ratio: 6/5)" srcSet={wide.srcSet} sizes="max(100vw, 178vh)" />
      <source srcSet={tall.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt text arrives through the image props */}
      <img {...tall} className="settle absolute inset-0 h-full w-full object-cover object-top art-wide:object-[100%_50%]" />
    </picture>
  );
}

export function Hero() {
  const game = games[0];
  const latest = articles[0];

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div className="hero-recede absolute inset-0 -z-10 origin-[75%_40%]">
        <HeroArt />
        <HeroMotion />
        <div className="absolute inset-0 bg-gradient-to-t from-ink from-30% via-ink/55 via-[44%] to-transparent to-[60%] max-sm:via-ink/80 max-sm:via-[50%] max-sm:to-[66%] art-wide:from-ink art-wide:from-0% art-wide:via-transparent art-wide:via-40% art-wide:to-transparent" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-transparent to-transparent art-wide:block" />
      </div>

      <div className="shell flex flex-1 flex-col justify-end pt-[44svh] pb-7 art-wide:pt-32 md:pb-10">
        <p className="eyebrow rise text-gold max-sm:text-[0.62rem] max-sm:tracking-[0.16em]" style={{ "--d": "150ms" } as React.CSSProperties}>
          Independent game development studio
        </p>
        <h1 id="hero-title" className="display display-hero mt-5">
          <span className="rise block" style={{ "--d": "250ms" } as React.CSSProperties}>
            We build <span className="max-sm:block">worlds</span>
          </span>
          <span className="rise block" style={{ "--d": "380ms" } as React.CSSProperties}>
            worth playing.
          </span>
        </h1>
        <div
          className="rise mt-7 flex max-w-5xl flex-col gap-7 lg:flex-row lg:items-end lg:gap-12"
          style={{ "--d": "520ms" } as React.CSSProperties}
        >
          <p className="lede max-w-md text-bone/80">
            We create interactive experiences designed to bring people together, challenge imagination and make every
            moment of play matter.
          </p>
          <div className="flex gap-3">
            <Link href="/games" className="btn btn-primary max-sm:flex-1 max-sm:px-3 max-sm:text-[0.68rem] max-sm:tracking-[0.08em]">
              Explore our games <Arrow className="max-sm:hidden" />
            </Link>
            <Link href="/studio" className="btn btn-ghost max-sm:flex-1 max-sm:px-3 max-sm:text-[0.68rem] max-sm:tracking-[0.08em]">
              About the studio
            </Link>
          </div>
        </div>
      </div>

      {/* The current work, in the first screen. */}
      <div className="rise border-t border-bone/15" style={{ "--d": "700ms" } as React.CSSProperties}>
        <div className="shell grid sm:grid-cols-2">
          <Link href={`/games/${game.slug}`} className="group flex items-center gap-4 py-4 sm:border-r sm:border-bone/15 sm:pr-6">
            <span className="relative hidden h-12 w-20 shrink-0 overflow-hidden sm:block">
              <Image src={game.keyArt.src} alt="" fill sizes="80px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.62rem] text-gold">{statusLabel[game.status]}</span>
              <span className="mt-1 block truncate text-sm font-medium">
                {game.title}: {game.subtitle}
              </span>
            </span>
            <Arrow className="shrink-0 text-bone/60 transition-colors group-hover:text-gold" />
          </Link>
          <Link href={`/news/${latest.slug}`} className="group hidden items-center gap-4 py-4 sm:flex sm:pl-6">
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.62rem] text-ash">Latest, {formatDate(latest.date)}</span>
              <span className="mt-1 block truncate text-sm font-medium">{latest.title}</span>
            </span>
            <Arrow className="shrink-0 text-bone/60 transition-colors group-hover:text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
