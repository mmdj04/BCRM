"use client";

import Link from "next/link";

import { Globe } from "lucide-react";

import { APP_CONFIG } from "@/config/app-config";
import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function RegisterV2() {
  const { locale, setLocale, t } = useI18n();

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">{t.auth.register.title}</h1>
          <p className="text-muted-foreground text-sm">{t.auth.register.description}</p>
        </div>
        <div className="space-y-4">
          <GoogleButton className="w-full" />
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">{t.auth.form.orContinue}</span>
          </div>
          <RegisterForm />
        </div>
      </div>

      <div className="absolute top-5 flex w-full justify-end px-10">
        <div className="text-muted-foreground text-sm">
          {t.auth.register.alreadyAccount}{" "}
          <Link prefetch={false} className="text-foreground" href="login">
            {t.auth.register.login}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <label className="flex items-center gap-1 text-sm">
          <Globe className="size-4 text-muted-foreground" />
          <span className="sr-only">{t.auth.locale.label}</span>
          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value as (typeof SUPPORTED_LOCALES)[number])}
            className="bg-transparent outline-none"
            aria-label={t.auth.locale.label}
          >
            {SUPPORTED_LOCALES.map((supportedLocale) => (
              <option key={supportedLocale} value={supportedLocale}>
                {LOCALE_LABELS[supportedLocale]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
