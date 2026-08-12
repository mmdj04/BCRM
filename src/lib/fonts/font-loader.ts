/**
 * Dynamic font loader — injects @font-face CSS on-demand.
 *
 * Geist/Geist Mono are loaded via next/font/google (build-time, self-hosted).
 * All other fonts use self-hosted woff2 files in public/fonts/.
 * Only the selected font's @font-face is injected → browser downloads only that font.
 */

const loaded = new Set<string>();

const FONT_FAMILY_MAP: Record<string, string> = {
  inter: "Inter",
  notoSans: "Noto Sans",
  roboto: "Roboto",
  outfit: "Outfit",
  dmSans: "DM Sans",
  nunitoSans: "Nunito Sans",
  figtree: "Figtree",
  raleway: "Raleway",
  publicSans: "Public Sans",
  jetBrainsMono: "JetBrains Mono",
  notoSerif: "Noto Serif",
  robotoSlab: "Roboto Slab",
  merriweather: "Merriweather",
  lora: "Lora",
  playfairDisplay: "Playfair Display",
};

const FONT_FILES: Record<string, string[]> = {
  inter: ["/fonts/inter-400.woff2", "/fonts/inter-700.woff2"],
  notoSans: ["/fonts/noto-sans-400.woff2", "/fonts/noto-sans-700.woff2"],
  roboto: ["/fonts/roboto-400.woff2", "/fonts/roboto-500.woff2", "/fonts/roboto-700.woff2"],
  outfit: ["/fonts/outfit-400.woff2", "/fonts/outfit-700.woff2"],
  dmSans: ["/fonts/dm-sans-400.woff2", "/fonts/dm-sans-700.woff2"],
  nunitoSans: ["/fonts/nunito-sans-400.woff2", "/fonts/nunito-sans-700.woff2"],
  figtree: ["/fonts/figtree-400.woff2", "/fonts/figtree-700.woff2"],
  raleway: ["/fonts/raleway-400.woff2", "/fonts/raleway-700.woff2"],
  publicSans: ["/fonts/public-sans-400.woff2", "/fonts/public-sans-700.woff2"],
  jetBrainsMono: ["/fonts/jetbrains-mono-400.woff2", "/fonts/jetbrains-mono-700.woff2"],
  notoSerif: ["/fonts/noto-serif-400.woff2", "/fonts/noto-serif-700.woff2"],
  robotoSlab: ["/fonts/roboto-slab-400.woff2", "/fonts/roboto-slab-700.woff2"],
  merriweather: ["/fonts/merriweather-400.woff2", "/fonts/merriweather-700.woff2"],
  lora: ["/fonts/lora-400.woff2", "/fonts/lora-700.woff2"],
  playfairDisplay: ["/fonts/playfair-display-400.woff2", "/fonts/playfair-display-700.woff2"],
};

const FONT_WEIGHTS: Record<string, number[]> = {
  inter: [400, 700],
  notoSans: [400, 700],
  roboto: [400, 500, 700],
  outfit: [400, 700],
  dmSans: [400, 700],
  nunitoSans: [400, 700],
  figtree: [400, 700],
  raleway: [400, 700],
  publicSans: [400, 700],
  jetBrainsMono: [400, 700],
  notoSerif: [400, 700],
  robotoSlab: [400, 700],
  merriweather: [400, 700],
  lora: [400, 700],
  playfairDisplay: [400, 700],
};

export function loadFont(fontKey: string): void {
  if (loaded.has(fontKey)) return;

  const family = FONT_FAMILY_MAP[fontKey];
  const files = FONT_FILES[fontKey];
  const weights = FONT_WEIGHTS[fontKey];

  if (!family || !files || !weights) return;

  const css = files
    .map((file, i) => {
      const weight = weights[i] || 400;
      return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url('${file}') format('woff2');}`;
    })
    .join("\n");

  const style = document.createElement("style");
  style.textContent = css;
  style.dataset.fontLoader = fontKey;
  document.head.appendChild(style);

  loaded.add(fontKey);
}

export function applyFont(fontKey: string): void {
  const cssVar = FONT_FAMILY_MAP[fontKey]
    ? `--font-${fontKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`
    : "--font-geist";

  // Geist fonts are loaded via next/font/google, no need for dynamic loading
  if (fontKey === "geist" || fontKey === "geistMono" || fontKey === "geistPixelSquare") {
    document.body.style.setProperty("--font-sans", `var(${cssVar})`);
    return;
  }

  // Load the @font-face CSS for self-hosted fonts
  loadFont(fontKey);
  document.body.style.setProperty("--font-sans", `var(${cssVar})`);
}
