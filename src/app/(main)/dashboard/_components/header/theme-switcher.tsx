"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { navTranslations } from "@/lib/i18n/nav-translations";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

const THEME_CYCLE = ["light", "dark", "system"] as const;
export function ThemeSwitcher() {
  const { locale } = useI18n();
  const t = navTranslations[locale].header;
  const { themeMode, setPreference } = usePreferencesStore(useShallow((state) => ({ themeMode: state.values.theme_mode, setPreference: state.setPreference })));
  const cycleTheme = () => { const currentIndex = THEME_CYCLE.indexOf(themeMode); setPreference("theme_mode", THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length]); };
  const label = themeMode === "light" ? t.lightTheme : themeMode === "dark" ? t.darkTheme : t.systemTheme;
  return <Button size="icon" onClick={cycleTheme} aria-label={label}><Monitor className="hidden [html[data-theme-mode=system]_&]:block" /><Sun className="hidden dark:block [html[data-theme-mode=system]_&]:hidden" /><Moon className="block dark:hidden [html[data-theme-mode=system]_&]:hidden" /></Button>;
}
