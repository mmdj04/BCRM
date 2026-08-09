"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertTriangle,
  ArrowRightLeft,
  FileUp,
  Mail,
  Plus,
  Trash2,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const roles = [
  { value: "admin", label: "Administrador", description: "Acesso total ao sistema" },
  { value: "manager", label: "Gerente", description: "Gerencia equipe e relatórios" },
  { value: "editor", label: "Editor", description: "Cria e edita conteúdo" },
  { value: "viewer", label: "Visualizador", description: "Apenas visualiza dados" },
];

const migrationSources = [
  { id: "csv", label: "Importar de CSV/Excel", description: "Importe uma planilha com os dados dos usuários" },
  { id: "google", label: "Google Workspace", description: "Importe equipes do Google Admin" },
  { id: "azure", label: "Azure Active Directory", description: "Sincronize com o Azure AD" },
  { id: "okta", label: "Okta", description: "Importe usuários do Okta" },
  { id: "other", label: "Outro sistema", description: "Migre de outro painel de administração" },
];

export function UsersStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("viewer");
  const [newTeam, setNewTeam] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [selectedMigration, setSelectedMigration] = useState<string[]>([]);
  const [mergeData, setMergeData] = useState(false);
  const [preserveExisting, setPreserveExisting] = useState(true);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");

  const addUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    updateSetupData({
      users: [...setupData.users, { name: newName, email: newEmail, role: newTeam, team: newTeam }],
    });
    setNewName("");
    setNewEmail("");
    setNewRole("viewer");
    setNewTeam("");
  };

  const removeUser = (index: number) => {
    updateSetupData({
      users: setupData.users.filter((_, i) => i !== index),
    });
  };

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    updateSetupData({
      teams: [...setupData.teams, { name: newTeamName, description: newTeamDescription }],
    });
    setNewTeamName("");
    setNewTeamDescription("");
  };

  const removeTeam = (index: number) => {
    updateSetupData({
      teams: setupData.teams.filter((_, i) => i !== index),
    });
  };

  const toggleMigration = (id: string) => {
    setSelectedMigration((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Gestão de Usuários
        </CardTitle>
        <CardDescription>
          Convide membros da equipe, crie equipes e configure permissões. Você pode adicionar mais
          usuários depois nas configurações.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Convite Manual */}
        <div className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <UserPlus className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">Convidar Usuário</span>
            <span className="ml-auto rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
              Opcional
            </span>
          </div>
          <FieldGroup className="gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="user-name">
                  Nome
                  <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                    Obrigatório
                  </span>
                </FieldLabel>
                <Input
                  id="user-name"
                  placeholder="Nome do usuário"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="user-email">
                  E-mail
                  <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                    Obrigatório
                  </span>
                </FieldLabel>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="usuario@empresa.com.br"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="user-role">
                  Função
                  <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                    Opcional
                  </span>
                </FieldLabel>
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
              <Field className="gap-1.5">
                <FieldLabel htmlFor="user-team">
                  Equipe
                  <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                    Opcional
                  </span>
                </FieldLabel>
                <select
                  id="user-team"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Sem equipe</option>
                  {setupData.teams.map((team) => (
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="user-message">
                Mensagem de Convite Personalizada
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="user-message"
                placeholder="Mensagem personalizada para o convite..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
              />
            </Field>
            <Button type="button" onClick={addUser} disabled={!newName.trim() || !newEmail.trim()}>
              <Mail className="mr-2 size-4" />
              Enviar Convite
            </Button>
          </FieldGroup>
        </div>

        {/* Equipes */}
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="teams">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <UsersRound className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Criar Equipes</span>
                <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
                {setupData.teams.length > 0 && (
                  <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">
                    {setupData.teams.length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="team-name">Nome da Equipe</FieldLabel>
                    <Input
                      id="team-name"
                      placeholder="Ex: Desenvolvimento"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="team-description">Descrição</FieldLabel>
                    <Input
                      id="team-description"
                      placeholder="Descreva o time..."
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                    />
                  </Field>
                </div>
                <Button type="button" onClick={addTeam} disabled={!newTeamName.trim()} variant="outline" size="sm">
                  <Plus className="mr-2 size-3" />
                  Adicionar Equipe
                </Button>

                {setupData.teams.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {setupData.teams.map((team, index) => (
                      <div key={`${team.name}-${index}`} className="flex items-center justify-between rounded-lg border p-2">
                        <div>
                          <p className="font-medium text-sm">{team.name}</p>
                          {team.description && (
                            <p className="text-muted-foreground text-xs">{team.description}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => removeTeam(index)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Migração/Integração */}
          <AccordionItem value="migration">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <ArrowRightLeft className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Migração e Integração</span>
                <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-xs">
                  Já usa outro sistema? Importe seus dados para o BCRM.
                </p>
                <div className="flex flex-col gap-2">
                  {migrationSources.map((source) => (
                    <label
                      key={source.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer",
                        selectedMigration.includes(source.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50",
                      )}
                    >
                      <Checkbox
                        checked={selectedMigration.includes(source.id)}
                        onCheckedChange={() => toggleMigration(source.id)}
                      />
                      <div className="flex-1">
                        <span className="font-medium text-sm">{source.label}</span>
                        <p className="text-muted-foreground text-xs">{source.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {selectedMigration.length > 0 && (
                  <div className="flex flex-col gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                    <p className="font-medium text-sm">Opções de Migração</p>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={mergeData} onCheckedChange={() => setMergeData(!mergeData)} />
                      <span>Fazer merge com dados existentes</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={preserveExisting} onCheckedChange={() => setPreserveExisting(!preserveExisting)} />
                      <span>Preservar dados existentes no BCRM</span>
                    </label>
                    <p className="text-muted-foreground text-xs">
                      {mergeData
                        ? "Os dados importados serão combinados com os dados atuais."
                        : "Os dados importados substituirão os dados atuais."}
                    </p>
                  </div>
                )}

                {selectedMigration.length > 0 && (
                  <Button variant="outline" size="sm">
                    <FileUp className="mr-2 size-3" />
                    Iniciar Importação
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Usuários Adicionados */}
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
                  {user.team && (
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">
                      {user.team}
                    </span>
                  )}
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

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-800 text-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <p>Usuários e equipes podem ser gerenciados depois em <strong>Configurações → Usuários</strong>.</p>
        </div>

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
