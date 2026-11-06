import Image from "next/image";
import Link from "next/link";
import { ScreenRail } from "@/components/game/ScreenRail";
import { StoreButton } from "@/components/game/StoreButton";
import { TrailerStage } from "@/components/game/TrailerStage";
import { Arrow, SectionLabel } from "@/components/ui/primitives";
import { games, statusLabel } from "@/content/games";

export function FeaturedGames() {
  const game = games[0];

  return (
    <section aria-labelledby="games-title" className="pb-[var(--section)]">
      <div className="shell">
        <SectionLabel index="02">Our games</SectionLabel>
      </div>

      {/* The title takes over the screen: its own art, its own atmosphere. */}
      <div className="relative isolate mt-10 flex min-h-[86svh] flex-col justify-end overflow-hidden md:mt-14">
        <Image
          src={game.world.src}
          alt={game.world.alt}
          fill
          sizes="100vw"
          quality={85}
          className="-z-10 object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink to-transparent" />

        <div className="shell pt-40 pb-12 md:pb-16">
          <p className="eyebrow text-gold">{statusLabel[game.status]}</p>
          <h2 id="games-title" className="mt-5">
            <Image src={game.logo.src} alt={game.title} width={game.logo.width} height={game.logo.height} sizes="(min-width: 768px) 470px, 70vw" className="-ml-[3%] h-auto w-[70vw] max-w-[470px]" />
          </h2>
          <p className="voice mt-5 text-3xl text-gold md:text-[2.75rem]">{game.subtitle}</p>
          <p className="lede mt-6 max-w-2xl text-bone/85">{game.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/games/${game.slug}`} className="btn btn-primary">
              Discover the game <Arrow />
            </Link>
            {game.trailer ? (
              <a href="#trailer" className="btn btn-ghost backdrop-blur-sm">
                Watch the trailer
              </a>
            ) : null}
            <StoreButton game={game} />
          </div>
        </div>
      </div>

      <dl className="shell grid grid-cols-2 gap-x-6 gap-y-6 border-b border-line py-8 md:grid-cols-6">
        {game.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow text-[0.62rem] text-ash">{fact.label}</dt>
            <dd className="mt-1.5 text-sm font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {game.trailer ? (
        <div className="shell isolate mt-14 md:mt-20" data-reveal>
          <TrailerStage title={game.title} trailer={game.trailer} />
        </div>
      ) : null}

      <div className="mt-14 md:mt-20" data-reveal>
        <ScreenRail screens={game.screens} />
      </div>

      <div className="shell mt-14 flex flex-col justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
        <p className="voice text-2xl text-ash md:text-3xl">
          One title today. <span className="text-bone">The shelf is built for more.</span>
        </p>
        <Link href="/games" className="btn btn-ghost self-start md:self-auto">
          All games <Arrow />
        </Link>
      </div>
    </section>
  );
}
