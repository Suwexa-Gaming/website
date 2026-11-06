import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mark, Wordmark } from "@/components/brand/Wordmark";
import { Philosophy } from "@/components/sections/Philosophy";
import { Showcase } from "@/components/sections/Showcase";
import { Arrow, PageHeader, SectionLabel } from "@/components/ui/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Studio",
  description: "Suwexa Gaming is an independent game development studio. How we think, what we work on, and a press kit for anyone writing about us.",
  alternates: { canonical: "/studio" },
};

const FACTS = [
  { label: "Studio", value: site.name },
  { label: "Type", value: "Independent game development studio" },
  { label: "First title", value: "Carrom Crest (Android)" },
  { label: "Press contact", value: site.email },
];

const DOWNLOADS = [
  { label: "Studio mark", detail: "SVG", href: "/brand/suwexa-mark.svg" },
  { label: "Wordmark", detail: "SVG", href: "/brand/suwexa-wordmark.svg" },
  { label: "Studio key art", detail: "WebP", href: "/images/studio/hero-wide.webp" },
  { label: "Carrom Crest key art", detail: "WebP", href: "/images/carrom-crest/key-art.webp" },
  { label: "Carrom Crest trailer", detail: "MP4, 1080p", href: "/video/carrom-crest-trailer-1080.mp4" },
];

export default function StudioPage() {
  return (
    <>
      <PageHeader label="The studio" title="Small, on purpose.">
        Suwexa Gaming is an independent game development studio. We are at the beginning, and we like it here: every
        decision is still close enough to the game to matter.
      </PageHeader>

      <figure className="relative aspect-[12/5] min-h-64 w-full overflow-hidden" data-reveal="image">
        <Image
          src="/images/studio/ridge.webp"
          alt="A dark mountain ridge at last light, with a fractured monolith standing on the plain before it."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </figure>

      <section aria-label="What we are building" className="section shell grid gap-10 md:grid-cols-12 md:gap-6">
        <p className="voice text-[2.2rem] md:col-span-7 md:text-[3.4rem]" data-reveal>
          We want to make original games, build worlds people recognise and reach players wherever they happen to be.
        </p>
        <div className="space-y-5 md:col-span-4 md:col-start-9" data-reveal>
          <p className="lede">
            None of that happens at once, and we would not believe a studio that claimed it did. So we measure ourselves by
            the work in front of us: whether it plays well, whether it respects the person holding it, and whether it is
            better this month than last.
          </p>
          <p className="lede">Our first game is Carrom Crest. It is where we learned what we care about.</p>
          <Link href="/games/carrom-crest" className="btn btn-ghost mt-3 max-w-full whitespace-normal">
            See Carrom Crest <Arrow />
          </Link>
        </div>
      </section>

      <Philosophy />
      <Showcase />

      <section id="press" aria-labelledby="press-title" className="scroll-mt-24 bg-ink-2">
        <div className="section shell">
          <SectionLabel>Press kit</SectionLabel>
          <h2 id="press-title" className="display display-lg mt-10" data-reveal>
            Writing about us?
          </h2>
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-12 md:gap-6">
            <dl className="md:col-span-5" data-reveal>
              {FACTS.map((fact) => (
                <div key={fact.label} className="border-t border-line py-4">
                  <dt className="eyebrow text-[0.62rem] text-ash">{fact.label}</dt>
                  <dd className="mt-1.5 break-words">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="md:col-span-6 md:col-start-7" data-reveal>
              <div className="flex items-center gap-4 bg-ink p-6 sm:gap-5 sm:p-8">
                <Mark className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <Wordmark className="h-auto w-full max-w-[13rem] min-w-0 text-bone" title="Suwexa" />
              </div>
              <ul className="mt-2">
                {DOWNLOADS.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <a href={item.href} download className="group flex items-center justify-between gap-4 py-4">
                      <span className="font-medium">{item.label}</span>
                      <span className="flex items-center gap-4 text-sm text-ash">
                        {item.detail}
                        <Arrow className="rotate-90 text-gold" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
