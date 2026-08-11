"use client";

import { useEffect, useState } from "react";

import { Building2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth/auth-context";

const industries = [
  "Tecnologia",
  "Saúde",
  "Educação",
  "Finanças",
  "Varejo",
  "Indústria",
  "Serviços",
  "Construção",
  "Agronegócio",
  "Outro",
];

const companySizes = [
  "1-10 funcionários",
  "11-50 funcionários",
  "51-200 funcionários",
  "201-500 funcionários",
  "500+ funcionários",
];

const defaultCompany = {
  name: "",
  cnpj: "",
  description: "",
  website: "",
  logo: "",
  industry: "",
  size: "",
  address: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  timezone: "America/Sao_Paulo",
};

function getStorageKeys(userId: string) {
  return {
    demo: "bcrm_setup_data_demo",
    real: `bcrm_setup_data_${userId}`,
  };
}

export function CompanySettingsSection() {
  const { user, isDemo } = useAuth();
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState(defaultCompany);

  useEffect(() => {
    if (!user?.userId) return;
    const keys = getStorageKeys(user.userId);
    const raw = localStorage.getItem(isDemo ? keys.demo : keys.real);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.company) {
          setCompany((prev) => ({ ...prev, ...parsed.company }));
        }
      } catch {
        /* ignore */
      }
    }
  }, [user?.id, isDemo]);

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
            company,
          }),
        );
      }

      // Save to database (real mode only)
      if (!isDemo && user?.id) {
        await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.userId,
            companyName: company.name,
            cnpj: company.cnpj,
          }),
        });
      }

      toast.success("Dados da empresa salvos com sucesso!");
    } catch {
      toast.error("Erro ao salvar dados da empresa.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="size-5" />
          Dados da Empresa
        </CardTitle>
        <CardDescription>Informações da sua empresa ou organização.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="cs-name">Nome da Empresa</FieldLabel>
            <Input
              id="cs-name"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              placeholder="Minha Empresa LTDA"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-cnpj">CNPJ</FieldLabel>
              <Input
                id="cs-cnpj"
                value={company.cnpj}
                onChange={(e) => setCompany({ ...company, cnpj: e.target.value })}
                placeholder="00.000.000/0001-00"
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-website">Website</FieldLabel>
              <Input
                id="cs-website"
                value={company.website}
                onChange={(e) => setCompany({ ...company, website: e.target.value })}
                placeholder="https://www.empresa.com.br"
              />
            </Field>
          </div>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="cs-description">Descrição</FieldLabel>
            <Textarea
              id="cs-description"
              value={company.description}
              onChange={(e) => setCompany({ ...company, description: e.target.value })}
              placeholder="Descreva sua empresa..."
              rows={3}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-industry">Setor/Indústria</FieldLabel>
              <select
                id="cs-industry"
                value={company.industry}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Selecione</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-size">Tamanho</FieldLabel>
              <select
                id="cs-size"
                value={company.size}
                onChange={(e) => setCompany({ ...company, size: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Selecione</option>
                {companySizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-city">Cidade</FieldLabel>
              <Input
                id="cs-city"
                value={company.city}
                onChange={(e) => setCompany({ ...company, city: e.target.value })}
                placeholder="Nova Iguaçu"
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-state">Estado</FieldLabel>
              <Input
                id="cs-state"
                value={company.state}
                onChange={(e) => setCompany({ ...company, state: e.target.value })}
                placeholder="RJ"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-phone">Telefone</FieldLabel>
              <Input
                id="cs-phone"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                placeholder="(21) 99999-9999"
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="cs-email">E-mail Corporativo</FieldLabel>
              <Input
                id="cs-email"
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                placeholder="contato@empresa.com.br"
              />
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
