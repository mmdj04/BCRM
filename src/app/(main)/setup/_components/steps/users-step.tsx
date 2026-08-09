"use client";

import { useState } from "react";

import { Trash2, UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSetup } from "@/contexts/setup-context";

const roles = [
  { value: "admin", label: "Administrador" },
  { value: "manager", label: "Gerente" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Visualizador" },
];

export function UsersStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("viewer");

  const addUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    updateSetupData({
      users: [...setupData.users, { name: newName, email: newEmail, role: newRole }],
    });
    setNewName("");
    setNewEmail("");
    setNewRole("viewer");
  };

  const removeUser = (index: number) => {
    updateSetupData({
      users: setupData.users.filter((_, i) => i !== index),
    });
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Gestão de Usuários
        </CardTitle>
        <CardDescription>
          Convide membros da equipe. Você pode adicionar mais usuários depois nas configurações.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <UserPlus className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">Convidar Usuário</span>
          </div>
          <FieldGroup className="gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="user-name">Nome</FieldLabel>
                <Input
                  id="user-name"
                  placeholder="Nome do usuário"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="user-email">E-mail</FieldLabel>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="usuario@empresa.com.br"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Field>
            </div>
            <div className="flex items-end gap-3">
              <Field className="flex-1 gap-1.5">
                <FieldLabel htmlFor="user-role">Função</FieldLabel>
                <select
                  id="user-role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Button type="button" onClick={addUser} disabled={!newName.trim() || !newEmail.trim()}>
                Adicionar
              </Button>
            </div>
          </FieldGroup>
        </div>

        {setupData.users.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">Usuários Adicionados ({setupData.users.length})</span>
            {setupData.users.map((user, index) => (
              <div key={`${user.email}-${index}`} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-muted px-2 py-0.5 text-xs">
                    {roles.find((r) => r.value === user.role)?.label}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => removeUser(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(4)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(6)}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
