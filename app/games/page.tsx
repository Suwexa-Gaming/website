import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, PageHeader, SectionLabel } from "@/components/ui/primitives";
import { games, genreSpace, statusLabel } from "@/content/games";

export const metadata: Metadata = {
  title: "Our Games",
  description: "The games of Suwexa Gaming, an independent studio. Starting with Carrom Crest, carrom with real physics and a story of its own.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <>
      <PageHeader label="Our games" title="The shelf.">
        A small shelf, on purpose. We would rather show one game we are proud of than a list we are not.
      </PageHeader>

      <div className="shell space-y-6">
        {games.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`} className="group relative isolate flex min-h-[70svh] flex-col justify-end overflow-hidden">
            <Image
              src={game.world.src}
              alt={game.world.alt}
              fill
              sizes="(min-width: 1800px) 1700px, 100vw"
              quality={85}
              className="-z-10 object-cover object-[72%_center] transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:p-10">
              <div>
                <p className="eyebrow text-gold">{statusLabel[game.status]}</p>
                <h2 className="display display-xl mt-3">{game.title}</h2>
                <p className="mt-3 text-bone/85">
                  {game.genre} · {game.platforms.join(", ")}
                </p>
              </div>
              <span className="btn btn-ghost self-start backdrop-blur-sm md:self-auto">
                View game <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section aria-labelledby="ahead-title" className="section shell">
        <SectionLabel>What interests us next</SectionLabel>
        <h2 id="ahead-title" className="display display-lg mt-10 max-w-[16ch]" data-reveal>
          Spaces we want to explore.
        </h2>
        <p className="lede mt-6 max-w-xl" data-reveal>
          These are interests, not announcements. When a new game is real, it will appear on this page with its status
          stated plainly.
        </p>
        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {genreSpace.map((genre) => (
            <li key={genre.name} className="border-b border-line py-7 sm:pr-6 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
              <p className="display display-md">{genre.name}</p>
              <p className="voice mt-3 text-xl text-ash">{genre.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
