import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScreenRail } from "@/components/game/ScreenRail";
import { StoreButton } from "@/components/game/StoreButton";
import { TrailerStage } from "@/components/game/TrailerStage";
import { Arrow, SectionLabel } from "@/components/ui/primitives";
import { games, getGame, statusLabel } from "@/content/games";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGame((await params).slug);
  if (!game) return {};
  const path = `/games/${game.slug}`;
  return {
    title: game.title,
    description: game.summary,
    alternates: { canonical: path },
    openGraph: { title: `${game.title} | ${site.name}`, description: game.summary, url: path, images: [game.keyArt.src] },
    twitter: { card: "summary_large_image", title: `${game.title} | ${site.name}`, description: game.summary, images: [game.keyArt.src] },
  };
}

export default async function GamePage({ params }: Props) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  const structured = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.summary,
    url: `${site.url}/games/${game.slug}`,
    image: `${site.url}${game.keyArt.src}`,
    genre: "Board game",
    gamePlatform: game.platforms,
    applicationCategory: "Game",
    operatingSystem: game.platforms.join(", "),
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    ...(game.trailer
      ? {
          trailer: {
            "@type": "VideoObject",
            name: `${game.title} trailer`,
            description: `The official trailer for ${game.title}: ${game.subtitle}.`,
            thumbnailUrl: `${site.url}${game.trailer.poster}`,
            contentUrl: `${site.url}${game.trailer.full1080}`,
            uploadDate: game.trailer.uploadDate,
            duration: game.trailer.isoDuration,
          },
        }
      : {}),
    ...(game.store.url ? { installUrl: game.store.url, sameAs: [game.store.url] } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      <header className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
        <Image src={game.world.src} alt={game.world.alt} fill priority sizes="100vw" quality={85} className="settle -z-10 object-cover object-[72%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="shell pt-40 pb-12 md:pb-16">
          <p className="eyebrow rise text-gold">{statusLabel[game.status]}</p>
          <h1 className="rise mt-5" style={{ "--d": "100ms" } as React.CSSProperties}>
            <Image src={game.logo.src} alt={game.title} width={game.logo.width} height={game.logo.height} priority sizes="(min-width: 768px) 580px, 80vw" className="-ml-[3%] h-auto w-[80vw] max-w-[580px]" />
          </h1>
          <p className="voice rise mt-4 text-3xl text-gold md:text-5xl" style={{ "--d": "200ms" } as React.CSSProperties}>
            {game.subtitle}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "300ms" } as React.CSSProperties}>
            {game.trailer ? (
              <a href="#trailer" className="btn btn-primary">
                Watch the trailer <Arrow />
              </a>
            ) : null}
            <StoreButton game={game} />
          </div>
        </div>
      </header>

      <dl className="shell grid grid-cols-2 gap-x-6 gap-y-6 border-b border-line py-8 md:grid-cols-6">
        {game.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow text-[0.62rem] text-ash">{fact.label}</dt>
            <dd className="mt-1.5 text-sm font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {game.trailer ? (
        <section aria-label="Trailer" className="shell isolate pt-14 md:pt-20" data-reveal>
          <TrailerStage title={game.title} trailer={game.trailer} />
        </section>
      ) : null}

      <section aria-label="About the game" className="section shell grid gap-10 md:grid-cols-12 md:gap-6">
        <p className="voice text-[2.1rem] text-bone md:col-span-6 md:text-[3.1rem]" data-reveal>
          {game.summary}
        </p>
        <div className="space-y-5 md:col-span-5 md:col-start-8" data-reveal>
          {game.description.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="screens-title" className="pb-[var(--section)]">
        <div className="shell">
          <SectionLabel>From the game</SectionLabel>
          <h2 id="screens-title" className="sr-only">
            Screens from the game
          </h2>
        </div>
        <div className="mt-10" data-reveal>
          <ScreenRail screens={game.screens} />
        </div>
      </section>

      {game.lands ? (
        <section aria-labelledby="lands-title" className="bg-ink-2">
          <div className="section shell">
            <SectionLabel>The world</SectionLabel>
            <h2 id="lands-title" className="display display-xl mt-10" data-reveal>
              Twenty-one lands. One road.
            </h2>
            <div className="mt-12 space-y-3 md:space-y-4">
              {game.lands.map((land) => (
                <figure key={land.name} className="relative aspect-[3/1] min-h-32 w-full overflow-hidden" data-reveal="image">
                  <Image src={land.src} alt={land.alt} fill sizes="100vw" className="object-cover" />
                  <figcaption className="eyebrow absolute bottom-3 left-4 text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">{land.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="features-title" className="section shell">
        <SectionLabel>In the game</SectionLabel>
        <h2 id="features-title" className="sr-only">
          Features
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-6">
          {game.features.map((group) => (
            <div key={group.title} data-reveal>
              <h3 className="display display-md">{group.title}</h3>
              <ul className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="border-t border-line pt-4 font-text text-[1.02rem] leading-normal text-ash">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <StoreButton game={game} />
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {game.privacyUrl ? (
              <Link href={game.privacyUrl} className="link-line pb-0.5 text-ash">
                {game.title} privacy policy
              </Link>
            ) : null}
            <Link href="/contact" className="link-line pb-0.5 text-ash">
              Support
            </Link>
            <Link href="/games" className="inline-flex items-center gap-3 font-medium">
              All games <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
