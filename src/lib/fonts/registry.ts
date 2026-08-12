import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import { GeistPixelSquare } from "geist/font/pixel";

// Build-time fonts (loaded via next/font/google, self-hosted at build)
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const fontRegistry = {
  geist: {
    label: "Geist",
    font: geist,
  },
  inter: {
    label: "Inter",
    font: null,
  },
  notoSans: {
    label: "Noto Sans",
    font: null,
  },
  nunitoSans: {
    label: "Nunito Sans",
    font: null,
  },
  figtree: {
    label: "Figtree",
    font: null,
  },
  roboto: {
    label: "Roboto",
    font: null,
  },
  raleway: {
    label: "Raleway",
    font: null,
  },
  dmSans: {
    label: "DM Sans",
    font: null,
  },
  publicSans: {
    label: "Public Sans",
    font: null,
  },
  outfit: {
    label: "Outfit",
    font: null,
  },
  geistMono: {
    label: "Geist Mono",
    font: geistMono,
  },
  geistPixelSquare: {
    label: "Geist Pixel Square",
    font: GeistPixelSquare,
  },
  jetBrainsMono: {
    label: "JetBrains Mono",
    font: null,
  },
  notoSerif: {
    label: "Noto Serif",
    font: null,
  },
  robotoSlab: {
    label: "Roboto Slab",
    font: null,
  },
  merriweather: {
    label: "Merriweather",
    font: null,
  },
  lora: {
    label: "Lora",
    font: null,
  },
  playfairDisplay: {
    label: "Playfair Display",
    font: null,
  },
} as const;

export type FontKey = keyof typeof fontRegistry;

export const fontKeys = Object.keys(fontRegistry) as FontKey[];

// Only build-time fonts have CSS variables (others loaded dynamically)
export const fontVars = Object.values(fontRegistry)
  .filter((entry) => entry.font !== null)
  .map(({ font }) => font!.variable)
  .join(" ");

export const fontOptions = fontKeys.map((key) => ({
  key,
  label: fontRegistry[key].label,
}));

// CSS variable names for all fonts (used by ThemeBootScript + applyPreference)
export const fontCssVars: Record<string, string> = {
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
