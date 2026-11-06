import Image from "next/image";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/ui/primitives";
import { articles, formatDate, type Article } from "@/content/news";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <article className="group" data-reveal>
      <Link href={`/news/${article.slug}`} className="block">
        {article.image ? (
          <span className={`relative block overflow-hidden bg-ink-2 ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              sizes={large ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 38vw, 100vw"}
              className="object-cover transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.03]"
            />
          </span>
        ) : null}
        <span className="eyebrow mt-6 flex flex-wrap gap-x-4 text-[0.65rem] text-ash">
          <span className="text-gold">{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </span>
        <span className={`display mt-3 block ${large ? "display-lg" : "display-md"}`}>
          <span className="link-line pb-1">{article.title}</span>
        </span>
        <span className="lede mt-4 block max-w-xl !text-[1.05rem]">{article.excerpt}</span>
      </Link>
    </article>
  );
}

export function NewsSection() {
  const [lead, second] = articles;
  return (
    <section aria-labelledby="news-title" className="bg-ink-2">
      <div className="section shell">
        <SectionLabel index="05">News</SectionLabel>
        <div className="mt-12 flex flex-col justify-between gap-6 md:mt-16 md:flex-row md:items-end">
          <h2 id="news-title" className="display display-xl" data-reveal>
            From the studio
          </h2>
          <Link href="/news" className="btn btn-ghost self-start md:self-auto">
            All news <Arrow />
          </Link>
        </div>
        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <ArticleCard article={lead} large />
          </div>
          {second ? (
            <div className="md:col-span-4 md:col-start-9">
              <ArticleCard article={second} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
