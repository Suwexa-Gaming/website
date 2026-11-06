import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Prose } from "@/components/ui/primitives";
import { articles, formatDate, getArticle } from "@/content/news";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const path = `/news/${article.slug}`;
  const images = article.image ? [article.image.src] : undefined;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: { type: "article", title: article.title, description: article.excerpt, url: path, publishedTime: article.date, images },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    ...(article.image ? { image: `${site.url}${article.image.src}` } : {}),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
      <header className="shell pt-36 pb-12 md:pt-48 md:pb-16">
        <p className="eyebrow rise flex flex-wrap gap-x-4 text-ash">
          <span className="text-gold">{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <h1 className="display display-xl rise mt-6 max-w-[16ch]" style={{ "--d": "80ms" } as React.CSSProperties}>
          {article.title}
        </h1>
      </header>
      {article.image ? (
        <figure className="shell">
          <div className="relative aspect-[16/8] overflow-hidden" data-reveal="image">
            <Image src={article.image.src} alt={article.image.alt} fill priority sizes="100vw" quality={90} className="object-cover" />
          </div>
        </figure>
      ) : null}
      <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8 md:col-start-3">
          <Prose>
            <p className="voice !text-[1.9rem] !leading-[1.2] !text-bone md:!text-[2.3rem]">{article.excerpt}</p>
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
          <Link href="/news" className="btn btn-ghost mt-12">
            All news <Arrow />
          </Link>
        </div>
      </div>
    </article>
  );
}
