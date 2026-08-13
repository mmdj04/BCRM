"use client";

import Link from "next/link";
import { siX } from "simple-icons";
import { SimpleIcon } from "@/components/simple-icon";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { navTranslations } from "@/lib/i18n/nav-translations";
import { useI18n } from "@/lib/i18n/provider";

export function SupportCard() {
  const { locale } = useI18n();
  const t = navTranslations[locale].support;
  return <Card size="sm" className="overflow-hidden shadow-none group-data-[collapsible=icon]:hidden"><CardHeader className="min-w-0 px-4"><CardTitle className="truncate text-sm">{t.title}</CardTitle><CardDescription className="line-clamp-3">{t.descriptionBefore}{" "}<Link href="https://x.com/arhamkhnz" target="_blank" rel="noreferrer" aria-label={t.reachOut} className="inline-flex items-center text-foreground"><SimpleIcon icon={siX} aria-hidden className="size-3 fill-foreground" /></Link>{" "}{t.descriptionBetween}{" "}<Link href="https://github.com/arhamkhnz#want-to-connect" target="_blank" rel="noreferrer" className="text-foreground hover:underline">{t.email}</Link>.</CardDescription></CardHeader></Card>;
}
