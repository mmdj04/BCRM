"use client";

import { Building2, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSetup } from "@/contexts/setup-context";

export function CompanyStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const canProceed = setupData.company.name.trim().length > 0;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-5" />
          Dados da Empresa
        </CardTitle>
        <CardDescription>Informações básicas da sua empresa ou organização.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-name">Nome da Empresa *</FieldLabel>
            <Input
              id="company-name"
              placeholder="Minha Empresa LTDA"
              value={setupData.company.name}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, name: e.target.value } })}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-cnpj">CNPJ</FieldLabel>
            <Input
              id="company-cnpj"
              placeholder="00.000.000/0001-00"
              value={setupData.company.cnpj}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, cnpj: e.target.value } })}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-description">Descrição</FieldLabel>
            <Textarea
              id="company-description"
              placeholder="Descreva brevemente sua empresa..."
              rows={3}
              value={setupData.company.description}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, description: e.target.value } })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-city">Cidade</FieldLabel>
              <Input
                id="company-city"
                placeholder="Nova Iguaçu"
                value={setupData.company.city}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, city: e.target.value } })}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-state">Estado</FieldLabel>
              <Input
                id="company-state"
                placeholder="RJ"
                value={setupData.company.state}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, state: e.target.value } })}
              />
            </Field>
          </div>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-address">Endereço</FieldLabel>
            <Input
              id="company-address"
              placeholder="Rua Exemplo, 123 - Centro"
              value={setupData.company.address}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, address: e.target.value } })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-phone">Telefone</FieldLabel>
              <Input
                id="company-phone"
                placeholder="(21) 99999-9999"
                value={setupData.company.phone}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, phone: e.target.value } })}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-email">E-mail</FieldLabel>
              <Input
                id="company-email"
                type="email"
                placeholder="contato@empresa.com.br"
                value={setupData.company.email}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, email: e.target.value } })}
              />
            </Field>
          </div>
        </FieldGroup>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(0)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(2)} disabled={!canProceed}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
