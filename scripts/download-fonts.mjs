#!/usr/bin/env node
/**
 * Download woff2 files for ALL theme fonts (latin subset, regular+bold).
 * Self-hosted in public/fonts/ to avoid external Google Fonts dependency.
 * Only the selected font is loaded at runtime via dynamic @font-face.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, "..", "public", "fonts");
mkdirSync(FONT_DIR, { recursive: true });

const FONTS = [
  { name: "Inter", var: "inter", weights: [400, 700] },
  { name: "Noto Sans", var: "noto-sans", weights: [400, 700] },
  { name: "Roboto", var: "roboto", weights: [400, 500, 700] },
  { name: "Outfit", var: "outfit", weights: [400, 700] },
  { name: "DM Sans", var: "dm-sans", weights: [400, 700] },
  { name: "Nunito Sans", var: "nunito-sans", weights: [400, 700] },
  { name: "Figtree", var: "figtree", weights: [400, 700] },
  { name: "Raleway", var: "raleway", weights: [400, 700] },
  { name: "Public Sans", var: "public-sans", weights: [400, 700] },
  { name: "JetBrains Mono", var: "jetbrains-mono", weights: [400, 700] },
  { name: "Noto Serif", var: "noto-serif", weights: [400, 700] },
  { name: "Roboto Slab", var: "roboto-slab", weights: [400, 700] },
  { name: "Merriweather", var: "merriweather", weights: [400, 700] },
  { name: "Lora", var: "lora", weights: [400, 700] },
  { name: "Playfair Display", var: "playfair-display", weights: [400, 700] },
  { name: "Geist Mono", var: "geist-mono", weights: [400, 700] },
];

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function downloadFont(font) {
  // Skip if all weight files already exist
  const existing = font.weights.filter((w) =>
    existsSync(join(FONT_DIR, `${font.var}-${w}.woff2`))
  );
  if (existing.length === font.weights.length) {
    console.log(`${font.name}... [cached]`);
    return font.weights.map((w) => `${font.var}-${w}.woff2`);
  }

  const apiName = font.name.replace(/ /g, "+");
  const weights = font.weights.join(";");
  const url = `https://fonts.googleapis.com/css2?family=${apiName}:wght@${weights}&display=swap`;

  process.stdout.write(`${font.name}...`);

  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/css" },
  });

  if (!res.ok) {
    console.log(` FAIL (${res.status})`);
    return [];
  }

  const css = await res.text();
  const downloaded = [];

  // Match: /* latin */\n@font-face { ... font-weight: NNN; ... url(...) ... }
  const regex = /\/\*\s*latin\s*\*\/\s*@font-face\s*\{[\s\S]*?font-weight:\s*(\d+)[\s\S]*?url\(([^)]+\.woff2)\)[\s\S]*?\}/g;
  let match = regex.exec(css);

  while (match !== null) {
    const weight = Number.parseInt(match[1], 10);
    if (font.weights.includes(weight)) {
      const woffRes = await fetch(match[2]);
      if (woffRes.ok) {
        const buffer = Buffer.from(await woffRes.arrayBuffer());
        const filename = `${font.var}-${weight}.woff2`;
        writeFileSync(join(FONT_DIR, filename), buffer);
        downloaded.push(filename);
        process.stdout.write(` ${weight}(${(buffer.length / 1024).toFixed(0)}KB)`);
      }
    }
    match = regex.exec(css);
  }

  console.log(` [${downloaded.length}]`);
  return downloaded;
}

async function main() {
  const manifest = {};

  for (const font of FONTS) {
    const files = await downloadFont(font);
    manifest[font.var] = {
      name: font.name,
      weights: font.weights,
      files,
    };
  }

  writeFileSync(join(FONT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  const total = Object.values(manifest).reduce((s, f) => s + f.files.length, 0);
  console.log(`\nDone! ${total} files in public/fonts/`);
}

main().catch(console.error);
