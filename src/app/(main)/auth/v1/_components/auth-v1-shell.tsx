"use client";

import Link from "next/link";
import { Command } from "lucide-react";

import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

function LocaleSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="absolute top-6 right-6 flex items-center gap-2 text-muted-foreground text-xs">
      <span>{t.auth.locale.label}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as (typeof SUPPORTED_LOCALES)[number])}
        className="rounded-md border bg-background px-2 py-1 text-foreground outline-none"
        aria-label={t.auth.locale.label}
      >
        {SUPPORTED_LOCALES.map((supportedLocale) => (
          <option key={supportedLocale} value={supportedLocale}>
            {LOCALE_LABELS[supportedLocale]}
          </option>
        ))}
      </select>
    </label>
  );
}

function AuthV1Content({ mode, children }: Readonly<{ mode: "login" | "register"; children: React.ReactNode }>) {
  const { t } = useI18n();
  const copy =
    mode === "login"
      ? {
          ...t.auth.login,
          accountPrompt: t.auth.login.noAccount,
          accountAction: t.auth.login.register,
          accountHref: "register",
        }
      : {
          ...t.auth.register,
          accountPrompt: t.auth.register.alreadyAccount,
          accountAction: t.auth.register.login,
          accountHref: "login",
        };

  return (
    <div className="relative flex h-dvh">
      <LocaleSwitcher />

      {mode === "login" ? (
        <div className="hidden bg-primary lg:block lg:w-1/3">
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="space-y-6">
              <Command className="mx-auto size-12 text-primary-foreground" />
              <div className="space-y-2">
                <h1 className="font-light text-5xl text-primary-foreground">{copy.welcomeTitle}</h1>
                <p className="text-primary-foreground/80 text-xl">{copy.welcomeSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight">{copy.title}</div>
            <div className="mx-auto max-w-xl text-muted-foreground">{copy.description}</div>
          </div>
          <div className="space-y-4">
            {children}
            <p className="text-center text-muted-foreground text-xs">
              {copy.accountPrompt}{" "}
              <Link prefetch={false} href={copy.accountHref} className="text-primary">
                {copy.accountAction}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {mode === "register" ? (
        <div className="hidden bg-primary lg:block lg:w-1/3">
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="space-y-6">
              <Command className="mx-auto size-12 text-primary-foreground" />
              <div className="space-y-2">
                <h1 className="font-light text-5xl text-primary-foreground">{copy.welcomeTitle}</h1>
                <p className="text-primary-foreground/80 text-xl">{copy.welcomeSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AuthV1Shell({ mode, children }: Readonly<{ mode: "login" | "register"; children: React.ReactNode }>) {
  return <AuthV1Content mode={mode}>{children}</AuthV1Content>;
}
