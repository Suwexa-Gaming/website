import type { MetadataRoute } from "next";
import { games } from "@/content/games";
import { gamePrivacyPolicies } from "@/content/legal";
import { articles } from "@/content/news";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/games", "/studio", "/news", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${site.url}${path}`,
  }));
  return [
    ...pages,
    ...games.map((game) => ({ url: `${site.url}/games/${game.slug}` })),
    ...Object.keys(gamePrivacyPolicies).map((slug) => ({ url: `${site.url}/games/${slug}/privacy` })),
    ...articles.map((article) => ({ url: `${site.url}/news/${article.slug}`, lastModified: article.date })),
  ];
}
