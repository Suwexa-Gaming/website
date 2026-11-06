# Suwexa Gaming website

The official site of Suwexa Gaming, an independent game development studio. Built with Next.js, TypeScript and Tailwind CSS.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lint, type check and production build
```

Copy `.env.example` to `.env.local` to configure it. Every variable is optional for local work.

## Layout

```
app/          Routes, metadata, sitemap, robots and the contact endpoint
components/
  brand/      Wordmark and studio mark
  game/       Store button, screen rail, playable table
  layout/     Header and footer
  sections/   Page sections
  ui/         Shared primitives and scroll reveals
content/      Site copy, games and news
lib/          Contact form validation
public/       Images, video and brand files
art/key-art/  Source of the studio key art
```

## Common edits

**Add a game:** add an entry to `content/games.ts`. The games page, detail page, sitemap and structured data follow it. Its `status` controls what the site claims about it.

**Publish news:** add an entry to the top of `content/news.ts`. Use the real date.

**Open the Carrom Crest download:** set `NEXT_PUBLIC_CARROM_CREST_PLAY_URL` once the Google Play listing is public. The download button then appears and the game is marked as available.

**Connect the contact form:** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. Until then the form opens the visitor's email app with the message filled in.

## Design system

Tokens are in `app/globals.css`.

- **Colour:** near-black neutrals and one accent, aged gold (`#E2AB3B`), taken from the studio logo.
- **Type:** Archivo, set heavy and condensed for display and normal for text. Space Grotesk for statements and descriptions. Both are open-licensed and self-hosted at build time.
- **The cut:** a clipped corner taken from the slant of the S, used on primary buttons and key images.
- **Motion:** reveal on scroll and a short page fade. All of it is disabled under `prefers-reduced-motion`, and nothing is hidden without scripting.

## Key art

The studio key art is original and rendered from `art/key-art/scene.html`:

```bash
npm i --no-save puppeteer-core
node art/key-art/render.mjs <output-dir> [view]
python art/key-art/grade.py <input.png> <output.webp>
node art/key-art/render-loop.mjs <output-dir> [wide|tall] [frames]   # hero animation frames
```

## Deployment

The site deploys to Vercel with no special configuration. Security headers are set in `next.config.ts`.
