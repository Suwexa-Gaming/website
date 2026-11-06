import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, Prose } from "@/components/ui/primitives";
import { getGame } from "@/content/games";
import { gamePrivacyPolicies } from "@/content/legal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(gamePrivacyPolicies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: `${game.title} Privacy Policy`,
    description: `How ${game.title} handles information.`,
    alternates: { canonical: `/games/${slug}/privacy` },
  };
}

export default async function GamePrivacyPage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  const html = gamePrivacyPolicies[slug];
  if (!game || !html) notFound();

  return (
    <>
      <PageHeader label={game.title} title="Privacy Policy" />
      <div className="shell pb-[var(--section)]">
        <Prose>
          <div className="policy" dangerouslySetInnerHTML={{ __html: html }} />
        </Prose>
      </div>
    </>
  );
}
