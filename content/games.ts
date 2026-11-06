/**
 * The studio portfolio. To add a title, append an entry to `games`: the games
 * index, the detail page, the sitemap and the structured data all follow it.
 *
 * `status` drives what the site is allowed to claim:
 *   - "available":  publicly downloadable. Requires a verified store URL.
 *   - "in-development": real project, not yet public. No download link is shown.
 *   - "concept": early idea. Its artwork is labelled as concept imagery.
 */
export type GameStatus = "available" | "in-development" | "concept";

export type GameImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type GameTrailer = {
  full1080: string;
  full720: string;
  /** A short silent loop of the same footage. */
  teaser: string;
  poster: string;
  posterAlt: string;
  width: number;
  height: number;
  duration: string;
  isoDuration: string;
  uploadDate: string;
};

export type Game = {
  slug: string;
  title: string;
  subtitle: string;
  status: GameStatus;
  genre: string;
  platforms: string[];
  engine?: string;
  version?: string;
  summary: string;
  description: string[];
  keyArt: GameImage & { width: number; height: number };
  /** Wide atmospheric art with no text in it, for full-bleed bands. */
  world: GameImage;
  /** The title's logo, trimmed to its visible edges. */
  logo: GameImage & { width: number; height: number };
  trailer?: GameTrailer;
  /** Portrait 1080 x 1920 captures taken from the game. */
  screens: GameImage[];
  lands?: { name: string; src: string; alt: string }[];
  features: { title: string; items: string[] }[];
  facts: { label: string; value: string }[];
  store: {
    name: string;
    packageId: string;
    /** Set only once the public listing resolves. Without it no download link renders. */
    url: string | null;
    pendingNote: string;
  };
  privacyUrl?: string;
};

const CARROM = "/images/carrom-crest";

export const games: Game[] = [
  {
    slug: "carrom-crest",
    title: "Carrom Crest",
    subtitle: "The Shattered Crest",
    status: process.env.NEXT_PUBLIC_CARROM_CREST_PLAY_URL ? "available" : "in-development",
    genre: "Board game with a story",
    platforms: ["Android"],
    engine: "Godot 4",
    version: "2.0.1",
    summary:
      "Carrom with real physics and a story of its own. Travel 21 invented lands, face the Keeper who guards each shard at the table, and bring colour back to a broken world.",
    description: [
      "Carrom is a game of touch: a flick, a rebound, a coin that stops one finger short of the pocket. Carrom Crest is built around that feeling. Every coin slides, collides and rebounds under simulated physics, with no canned animations standing in for the real thing.",
      "Around the table is a world. The Great Crest hung over the First Board and it kept the peace, until it was broken. Each land has its own painted setting, its own verse and its own original music, and each victory brings colour back to a land under the Stillness. It also costs someone something.",
    ],
    keyArt: {
      src: `${CARROM}/key-art.webp`,
      width: 1280,
      height: 720,
      alt: "Carrom Crest key art: the golden Great Crest cracking apart in front of a mountain range under an aurora, beside the game's logo.",
    },
    world: {
      src: `${CARROM}/world-crest.webp`,
      alt: "The Great Crest, a golden sunburst with a compass star at its heart, hanging over a snowy range under an aurora.",
    },
    logo: {
      src: `${CARROM}/logo.webp`,
      width: 1389,
      height: 1000,
      alt: "Carrom Crest logo",
    },
    trailer: {
      full1080: "/video/carrom-crest-trailer-1080.mp4",
      full720: "/video/carrom-crest-trailer-720.mp4",
      teaser: "/video/carrom-crest-teaser.mp4",
      poster: `${CARROM}/trailer-poster.webp`,
      posterAlt: "A frame from the trailer: the Great Crest hanging over a snowy range under an aurora, with the line Above it hung the Great Crest.",
      width: 1920,
      height: 916,
      duration: "0:40",
      isoDuration: "PT40S",
      uploadDate: "2026-11-06",
    },
    screens: [
      {
        src: `${CARROM}/match-table.webp`,
        alt: "A 3D carrom match in progress: coins clustered at the centre of a glossy table, the striker on the baseline, scores at the top of the screen.",
        caption: "A match, with the aim guide on the striker",
      },
      {
        src: `${CARROM}/keeper-niran.webp`,
        alt: "Story scene: Niran, Keeper of Lanthira, shown as a crimson seal above a river of lanterns, with a line of dialogue.",
        caption: "A Keeper, before the match",
      },
      {
        src: `${CARROM}/world-tour.webp`,
        alt: "The World Tour screen: painted cards for each land along the road, with coin and rank information at the top.",
        caption: "The World Tour",
      },
      {
        src: `${CARROM}/shard-recovered.webp`,
        alt: "A golden compass in a snowy mountain land under an aurora, with the caption Shard 5 of 21.",
        caption: "Shard 5 of 21",
      },
      {
        src: `${CARROM}/friend-room.webp`,
        alt: "A friend room with a five-digit code and three players listed, offering to start a three-player match for points.",
        caption: "A room for friends on the same network",
      },
      {
        src: `${CARROM}/titles-road.webp`,
        alt: "A winding road of locked and unlocked title emblems, with Pathfinder as the next title.",
        caption: "Eight titles, from Wanderer to Crestbearer",
      },
      {
        src: `${CARROM}/crest-broken.webp`,
        alt: "The opening of the story: the Great Crest bursting apart in a ring of light above a dark table.",
        caption: "The prologue: the Crest breaks",
      },
      {
        src: `${CARROM}/first-board.webp`,
        alt: "The First Board, a carrom table carved from stone on a summit, beneath the Great Crest, with the line Then, one night.",
        caption: "The First Board",
      },
    ],
    lands: [
      { name: "Lanthira", src: `${CARROM}/lands/lanthira.webp`, alt: "Lanthira: a night city of dark towers above a river filled with small lights." },
      { name: "Orumeth", src: `${CARROM}/lands/orumeth.webp`, alt: "Orumeth: small roofs among jagged snow-capped peaks at dusk, above a sea of cloud." },
      { name: "Aelmira", src: `${CARROM}/lands/aelmira.webp`, alt: "Aelmira: tall palms on a shore at sunset, with a calm sea behind them." },
      { name: "Nalithe", src: `${CARROM}/lands/nalithe.webp`, alt: "Nalithe: a white hilltop town on a green island above clear blue water." },
    ],
    features: [
      {
        title: "Real carrom, real physics",
        items: [
          "Coins that slide, collide and rebound naturally",
          "Slingshot aiming with an optional compass guide and power meter",
          "3D tables with real-wood boards, or a classic 2D view",
        ],
      },
      {
        title: "Play your way",
        items: [
          "A computer opponent on Easy, Medium or Hard that plans real shots, including bank shots",
          "Pass and play with 2 or 4 players on one phone",
          "Carrom, Freestyle and Disc Pool modes, with Pro Rules for experienced players",
        ],
      },
      {
        title: "Friends in one room",
        items: [
          "2, 3 or 4 phones on the same Wi-Fi or hotspot, joined with a 5-digit code",
          "One on one, two teams, or three players each for themselves",
          "No account and no internet connection needed",
        ],
      },
    ],
    facts: [
      { label: "Platform", value: "Android" },
      { label: "Genre", value: "Board game" },
      { label: "Players", value: "1 to 4" },
      { label: "Connection", value: "Plays offline" },
      { label: "Account", value: "None needed" },
      { label: "Ads", value: "None in version 2.0.1" },
    ],
    store: {
      name: "Google Play",
      packageId: "dev.carromcrest.game",
      url: process.env.NEXT_PUBLIC_CARROM_CREST_PLAY_URL ?? null,
      pendingNote: "The public Google Play listing is being prepared.",
    },
    privacyUrl: "/games/carrom-crest/privacy",
  },
];

export const genreSpace = [
  { name: "Pool", note: "Tables, angles and the long shot" },
  { name: "Casual", note: "Easy to begin, hard to put down" },
  { name: "Strategy", note: "Decisions that outlast the turn" },
  { name: "Original worlds", note: "Ideas with no rulebook yet" },
] as const;

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}

export const statusLabel: Record<GameStatus, string> = {
  available: "Available now",
  "in-development": "In development",
  concept: "Concept",
};
