"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n/provider";
import { LOCALE_LABELS } from "@/lib/i18n/config";
import { navTranslations } from "@/lib/i18n/nav-translations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const t = navTranslations[locale].header;
  return <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" aria-label={t.language}><Languages /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuRadioGroup value={locale} onValueChange={(value) => { if (value === "pt-BR" || value === "en-US") setLocale(value); }}><DropdownMenuRadioItem value="pt-BR">{LOCALE_LABELS["pt-BR"]}</DropdownMenuRadioItem><DropdownMenuRadioItem value="en-US">{LOCALE_LABELS["en-US"]}</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>;
}
