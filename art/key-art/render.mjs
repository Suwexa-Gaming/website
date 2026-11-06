// Renders the Suwexa key-art views through a local Chrome.
//   npm i --no-save puppeteer-core
//   node art/key-art/render.mjs <output-dir> [view ...] [--preview]
// Chrome path can be overridden with CHROME_PATH.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(join(process.cwd(), "index.js"));
const puppeteer = require("puppeteer-core");

const here = dirname(fileURLToPath(import.meta.url));
const SUN = [0.0, 0.055, -1];

export const views = {
  // Monolith right of frame, dark sky left for the headline.
  "hero-wide": { w: 2560, h: 1440, cam: [0.4, 1.2, 17], target: [0, 5.6, 0], shift: [-1.06, -0.1], lens: 2.55, mode: 0, aa: 3, sun: SUN },
  // Monolith high in frame, dark foreground for text.
  "hero-tall": { w: 1170, h: 2080, cam: [0.3, 1.0, 21], target: [0, 5.4, 0], shift: [0.0, -0.32], lens: 2.0, mode: 0, aa: 3, sun: SUN },
  // Close on the fracture.
  fracture: { w: 1920, h: 1200, cam: [-3.4, 5.6, 7.8], target: [-0.1, 6.5, 0], shift: [0, 0], lens: 2.3, mode: 0, aa: 3, sun: SUN },
  // Close on the crystals erupting from a fracture.
  crystals: { w: 2400, h: 1350, cam: [3.6, 5.4, 5.6], target: [0.5, 5.2, 0], shift: [0, 0], lens: 2.2, mode: 0, aa: 3, sun: SUN },
  // Wide world view, for the studio pages.
  ridge: { w: 2400, h: 1000, cam: [8.5, 2.2, 36], target: [-3, 4.0, 0], shift: [0, 0.14], lens: 2.3, mode: 0, aa: 3, sun: SUN },
  // Engineering view of the hero.
  wire: { w: 1800, h: 1260, cam: [5.4, 3.0, 15], target: [0, 5.0, 0], shift: [0, 0], lens: 1.9, mode: 1, aa: 3, sun: SUN },
  // Survey sheet of the terrain.
  survey: { w: 1800, h: 1260, cam: [0, 0, 1], target: [0, 0, 0], shift: [0, 0], lens: 1, mode: 2, aa: 3, sun: SUN },
};

const args = process.argv.slice(2);
const out = resolve(args.shift() ?? ".");
const preview = args.includes("--preview");
const wanted = args.filter((a) => !a.startsWith("--"));
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  protocolTimeout: 3_000_000,
  args: ["--use-angle=d3d11", "--ignore-gpu-blocklist", "--enable-gpu-rasterization", "--disable-gpu-watchdog", "--allow-file-access-from-files"],
});

const page = await browser.newPage();
page.on("console", (m) => console.log("[page]", m.text()));
page.on("pageerror", (e) => console.error("[page error]", e.message));
await page.goto(pathToFileURL(join(here, "scene.html")).href);

for (const name of wanted.length ? wanted : Object.keys(views)) {
  const v = { ...views[name], tile: 128 };
  if (preview) {
    const s = 1100 / Math.max(v.w, v.h);
    v.w = Math.round(v.w * s);
    v.h = Math.round(v.h * s);
    v.aa = 2;
  }
  const started = Date.now();
  const url = await page.evaluate((o) => window.renderScene(o), v);
  writeFileSync(join(out, `${name}.png`), Buffer.from(url.split(",")[1], "base64"));
  console.log(name, `${v.w}x${v.h}`, `${((Date.now() - started) / 1000).toFixed(1)}s`);
}

await browser.close();
