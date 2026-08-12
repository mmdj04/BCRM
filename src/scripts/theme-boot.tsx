/**
 * Boot script that reads user preference values from cookies or localStorage
 * based on the configured persistence mode.
 *
 * Runs early in <head> to apply the correct data attributes before hydration,
 * preventing layout or theme flicker and keeping RootLayout fully static.
 *
 * Also injects @font-face for the selected self-hosted font on initial load.
 */
import { PREFERENCE_REGISTRY } from "@/lib/preferences/preferences-config";

// Font family names for self-hosted fonts
const FONT_FAMILIES: Record<string, string> = {
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

const FONT_CSS_VARS: Record<string, string> = {
  geist: "--font-geist",
  inter: "--font-inter",
  notoSans: "--font-noto-sans",
  nunitoSans: "--font-nunito-sans",
  figtree: "--font-figtree",
  roboto: "--font-roboto",
  raleway: "--font-raleway",
  dmSans: "--font-dm-sans",
  publicSans: "--font-public-sans",
  outfit: "--font-outfit",
  geistMono: "--font-geist-mono",
  geistPixelSquare: "--font-geist-pixel-square",
  jetBrainsMono: "--font-jetbrains-mono",
  notoSerif: "--font-noto-serif",
  robotoSlab: "--font-roboto-slab",
  merriweather: "--font-merriweather",
  lora: "--font-lora",
  playfairDisplay: "--font-playfair-display",
};

export function ThemeBootScript() {
  const registry = JSON.stringify(PREFERENCE_REGISTRY);
  const families = JSON.stringify(FONT_FAMILIES);
  const cssVars = JSON.stringify(FONT_CSS_VARS);

  const code = `
    (function () {
      try {
        var root = document.documentElement;
        var REGISTRY = ${registry};
        var FONT_FAMILIES = ${families};
        var FONT_CSS_VARS = ${cssVars};

        function readCookie(name) {
          var match = document.cookie.split("; ").find(function(c) {
            return c.startsWith(name + "=");
          });
          return match ? decodeURIComponent(match.split("=")[1]) : null;
        }

        function readLocal(name) {
          try {
            return window.localStorage.getItem(name);
          } catch (e) {
            return null;
          }
        }

        function readPreference(key, definition) {
          var mode = definition.persistence;
          var value = null;

          if (mode === "localStorage") {
            value = readLocal(key);
          }

          if (!value && (mode === "client-cookie" || mode === "server-cookie")) {
            value = readCookie(key);
          }

          return definition.values.indexOf(value) >= 0 ? value : definition.defaultValue;
        }

        var preferences = {};

        Object.keys(REGISTRY).forEach(function(key) {
          var definition = REGISTRY[key];
          var value = readPreference(key, definition);

          preferences[key] = value;
          root.setAttribute(definition.attribute, value);
        });

        var mode = preferences.theme_mode;
        var resolvedMode =
          mode === "system" && window.matchMedia
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : mode === "dark"
              ? "dark"
              : "light";

        root.classList.toggle("dark", resolvedMode === "dark");
        root.style.colorScheme = resolvedMode;

        // Apply selected font
        var fontKey = preferences.font;
        var cssVar = FONT_CSS_VARS[fontKey];
        if (cssVar) {
          var body = document.body;
          var setVar = function() {
            (body || document.body).style.setProperty("--font-sans", "var(" + cssVar + ")");
          };

          if (body) {
            setVar();
          } else {
            document.addEventListener("DOMContentLoaded", setVar);
          }

          // For self-hosted fonts, inject @font-face CSS in <head>
          var family = FONT_FAMILIES[fontKey];
          if (family) {
            var weights = fontKey === "roboto" ? [400, 500, 700] : [400, 700];
            var css = weights.map(function(w) {
              return "@font-face{font-family:'" + family + "';font-style:normal;font-weight:" + w + ";font-display:swap;src:url('/fonts/" + fontKey + "-" + w + ".woff2') format('woff2');}";
            }).join("\\n");
            var style = document.createElement("style");
            style.textContent = css;
            document.head.appendChild(style);
          }
        }

      } catch (e) {
        console.warn("ThemeBootScript error:", e);
      }
    })();
  `;

  /* biome-ignore lint/security/noDangerouslySetInnerHtml: required for pre-hydration boot script */
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
