"use client";

import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSetup } from "@/contexts/setup-context";

const languages = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (US)" },
  { value: "es", label: "Español" },
];

const themes = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
  { value: "system", label: "Sistema" },
];

const modes = [
  { value: "production", label: "Produção" },
  { value: "development", label: "Desenvolvimento" },
];

export function ProjectStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const canProceed = setupData.project.name.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* Title */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Configurações do projeto</h1>
        <p className="text-base text-muted-foreground">Defina as informações do seu projeto BCRM.</p>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col gap-5">
        {/* Project icon + name */}
        <div className="flex items-end gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted/50">
            <Globe className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="project-name">Nome do projeto</FieldLabel>
              <Input
                id="project-name"
                placeholder="BCRM"
                value={setupData.project.name}
                onChange={(e) => updateSetupData({ project: { ...setupData.project, name: e.target.value } })}
              />
            </Field>
          </div>
        </div>

        {/* URL */}
        <Field className="gap-1.5">
          <FieldLabel htmlFor="project-url">URL do projeto</FieldLabel>
          <Input
            id="project-url"
            placeholder="https://bcrm.vercel.app"
            value={setupData.project.url}
            onChange={(e) => updateSetupData({ project: { ...setupData.project, url: e.target.value } })}
          />
        </Field>

        {/* Custom Domain */}
        <Field className="gap-1.5">
          <FieldLabel htmlFor="project-custom-domain">Domínio personalizado</FieldLabel>
          <Input
            id="project-custom-domain"
            placeholder="admin.empresa.com.br"
            value={setupData.project.customDomain}
            onChange={(e) => updateSetupData({ project: { ...setupData.project, customDomain: e.target.value } })}
          />
        </Field>

        {/* Language / Theme / Mode */}
        <div className="grid grid-cols-3 gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-language">Idioma</FieldLabel>
            <select
              id="project-language"
              value={setupData.project.language}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, language: e.target.value } })}
              className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-theme">Tema padrão</FieldLabel>
            <select
              id="project-theme"
              value={setupData.project.theme}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, theme: e.target.value } })}
              className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {themes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-mode">Modo</FieldLabel>
            <select
              id="project-mode"
              value={setupData.project.mode}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, mode: e.target.value } })}
              className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {modes.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className="mt-6 w-full bg-[#16a34a] text-white hover:bg-[#15803d]"
        onClick={() => setStep(3)}
        disabled={!canProceed}
      >
        Continuar
      </Button>
    </div>
  );
}
