"use client";

import { useEffect, useState } from "react";

import { Globe, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/supabase/auth-context";

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

const defaultProject = {
  name: "BCRM",
  url: "",
  customDomain: "",
  logo: "",
  description: "",
  language: "pt-BR",
  theme: "light",
};

function getStorageKeys(userId: string) {
  return {
    demo: "bcrm_setup_data_demo",
    real: `bcrm_setup_data_${userId}`,
  };
}

export function ProjectSettingsSection() {
  const { user, isDemo } = useAuth();
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState(defaultProject);

  useEffect(() => {
    if (!user?.userId) return;
    const keys = getStorageKeys(user.userId);
    const raw = localStorage.getItem(isDemo ? keys.demo : keys.real);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.project) {
          setProject((prev) => ({ ...prev, ...parsed.project }));
        }
      } catch {
        /* ignore */
      }
    }
  }, [user?.userId, isDemo]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      if (user?.userId) {
        const keys = getStorageKeys(user.userId);
        const storageKey = isDemo ? keys.demo : keys.real;
        const raw = localStorage.getItem(storageKey);
        const parsed = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            ...parsed,
            project,
          }),
        );
      }

      toast.success("Configurações do projeto salvas com sucesso!");
    } catch {
      toast.error("Erro ao salvar configurações do projeto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="size-5" />
          Configurações do Projeto
        </CardTitle>
        <CardDescription>Informações e preferências do projeto BCRM.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="ps-name">Nome do Projeto</FieldLabel>
            <Input
              id="ps-name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              placeholder="BCRM"
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="ps-url">URL do Projeto</FieldLabel>
            <Input
              id="ps-url"
              value={project.url}
              onChange={(e) => setProject({ ...project, url: e.target.value })}
              placeholder="https://bcrm.vercel.app"
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="ps-domain">Domínio Personalizado</FieldLabel>
            <Input
              id="ps-domain"
              value={project.customDomain}
              onChange={(e) => setProject({ ...project, customDomain: e.target.value })}
              placeholder="admin.empresa.com.br"
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="ps-logo">URL do Logo</FieldLabel>
            <Input
              id="ps-logo"
              value={project.logo}
              onChange={(e) => setProject({ ...project, logo: e.target.value })}
              placeholder="https://exemplo.com/logo.png"
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="ps-description">Descrição</FieldLabel>
            <Textarea
              id="ps-description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              placeholder="Descreva o projeto..."
              rows={3}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="ps-language">Idioma</FieldLabel>
              <select
                id="ps-language"
                value={project.language}
                onChange={(e) => setProject({ ...project, language: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {languages.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="ps-theme">Tema Padrão</FieldLabel>
              <select
                id="ps-theme"
                value={project.theme}
                onChange={(e) => setProject({ ...project, theme: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {themes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 size-4" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
