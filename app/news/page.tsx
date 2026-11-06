import type { Metadata } from "next";
import { ArticleCard } from "@/components/sections/NewsSection";
import { PageHeader } from "@/components/ui/primitives";
import { articles } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "Updates from Suwexa Gaming: development notes, releases and studio news.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHeader label="News" title="From the studio.">
        When something real happens, it is written down here with its date. Nothing else.
      </PageHeader>
      <div className="shell pb-[var(--section)]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <ArticleCard article={lead} large />
          </div>
          <div className="space-y-14 md:col-span-4">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
