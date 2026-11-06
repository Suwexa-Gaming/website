export const site = {
  name: "Suwexa Gaming",
  shortName: "Suwexa",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://suwexa.vercel.app").replace(/\/$/, ""),
  description:
    "Suwexa Gaming is an independent game development studio building original interactive worlds. Home of Carrom Crest.",
  statement: "An independent game development studio. We build worlds worth playing.",
  /** Public studio address. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "suwexagaming@gmail.com",
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Our Games" },
  { href: "/studio", label: "Studio" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const principles = [
  {
    index: "01",
    title: "Purposeful design",
    statement: "Every interaction should have a reason to exist.",
    detail: "If a screen, a sound or a rule does not make the game better to play, it does not ship.",
  },
  {
    index: "02",
    title: "Gameplay first",
    statement: "The experience matters more than the marketing.",
    detail: "We start with how a thing feels in the hand, and we let everything else follow from there.",
  },
  {
    index: "03",
    title: "Built to evolve",
    statement: "Great games grow through thoughtful development.",
    detail: "A release is the point where players start teaching us. We plan to keep improving what we ship.",
  },
] as const;
