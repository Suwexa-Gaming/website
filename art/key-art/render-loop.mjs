// Renders the seamless hero animation as numbered PNG frames.
//   npm i --no-save puppeteer-core
//   node art/key-art/render-loop.mjs <output-dir> [wide|tall] [frames]
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(join(process.cwd(), "index.js"));
const puppeteer = require("puppeteer-core");
const here = dirname(fileURLToPath(import.meta.url));

const SUN = [0.0, 0.055, -1];
const VIEWS = {
  wide: { w: 1600, h: 900, cam: [0.4, 1.2, 17], target: [0, 5.6, 0], shift: [-1.06, -0.1], lens: 2.55, mode: 0, aa: 2, sun: SUN },
  tall: { w: 720, h: 1280, cam: [0.3, 1.0, 21], target: [0, 5.4, 0], shift: [0.0, -0.32], lens: 2.0, mode: 0, aa: 2, sun: SUN },
};

const [outArg, viewArg = "wide", framesArg = "168"] = process.argv.slice(2);
const out = resolve(outArg ?? ".", viewArg);
const frames = Number(framesArg);
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  protocolTimeout: 3_000_000,
  args: ["--use-angle=d3d11", "--ignore-gpu-blocklist", "--disable-gpu-watchdog", "--allow-file-access-from-files"],
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("[page error]", e.message));
await page.goto(pathToFileURL(join(here, "scene.html")).href);

for (let i = 0; i < frames; i++) {
  const started = Date.now();
  const url = await page.evaluate((o) => window.renderScene(o), { ...VIEWS[viewArg], tile: 128, loop: i / frames });
  writeFileSync(join(out, `${String(i).padStart(4, "0")}.png`), Buffer.from(url.split(",")[1], "base64"));
  if (i % 12 === 0) console.log(viewArg, i, `${((Date.now() - started) / 1000).toFixed(1)}s`);
}
await browser.close();
