/**
 * Studio news. Newest first. To publish, add an entry: the news index, the
 * article page, the home page teaser and the sitemap all follow it.
 * Only record things that have actually happened, with the date they happened.
 */
export type Article = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  category: "Studio" | "Development" | "Release";
  excerpt: string;
  image?: { src: string; alt: string; width: number; height: number };
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "the-studio-opens-its-doors",
    title: "The studio opens its doors",
    date: "2026-11-06",
    category: "Studio",
    excerpt: "Suwexa Gaming now has a home of its own on the web, and a place to show the work as it happens.",
    image: {
      src: "/images/studio/ridge.webp",
      alt: "A dark mountain ridge at last light, with a fractured monolith standing on the plain before it.",
      width: 2880,
      height: 1200,
    },
    body: [
      "Suwexa Gaming is an independent game development studio, and as of today this site is where we show what we are making.",
      "There is not much ceremony to it. The site holds the games, the thinking behind them and a way to reach us. When something real happens, it will be written down here, with its date.",
      "If you would like to talk about games, publishing or anything else you think we should hear, the contact page is open.",
    ],
  },
  {
    slug: "carrom-crest-2-0-1-the-shattered-crest",
    title: "Carrom Crest 2.0.1: The Shattered Crest",
    date: "2026-11-05",
    category: "Development",
    excerpt: "Version 2.0.1 turns the World Tour into a story, puts friends in one room and rebuilds every land in 3D.",
    image: {
      src: "/images/carrom-crest/key-art.webp",
      alt: "Carrom Crest key art: the golden Great Crest cracking apart in front of a mountain range under an aurora.",
      width: 1280,
      height: 720,
    },
    body: [
      "The work on Carrom Crest 2.0.1 came together on 5 November 2026, and the update is now being prepared for release on Google Play.",
      "The World Tour has become a story. In The Shattered Crest, players travel 21 invented lands and face the Keeper who guards each shard at the table. Every land has its own painted world and its own original music.",
      "Friends can now play together in one room: 2, 3 or 4 phones on the same Wi-Fi or hotspot, joined with a 5-digit code. Two play one on one, four play as two teams, and three play each for themselves for points. There is no account to create and no internet connection to find.",
      "The update also adds a player card with sigils, banners and eight titles to earn, along with a new compass aim guide. The game still has no ads and no account.",
      "The first trailer is also finished: 40 seconds of the story and the table. You can watch it on the Carrom Crest page.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
