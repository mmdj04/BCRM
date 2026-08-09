"use client";

import { useMemo } from "react";

import { useSetupStorage } from "@/hooks/use-setup-storage";

import { type UserRow, type UserTeam, users } from "./_components/data";
import { Users } from "./_components/users";

const validTeams = new Set<string>([
  "Plataforma",
  "Crescimento",
  "Receita",
  "Operações de Cliente",
  "Ferramentas Internas",
  "Conformidade",
  "Operações de Pessoal",
  "Financeiro",
]);

function formatDate(date: Date): string {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function Page() {
  const { setupUsers } = useSetupStorage();

  const allUsers = useMemo(() => {
    const mappedSetupUsers: UserRow[] = setupUsers.map((u) => ({
      name: u.name,
      email: u.email,
      role: u.role,
      team: (validTeams.has(u.team) ? u.team : "Plataforma") as UserTeam,
      status: "Ativo" as const,
      joinedDate: formatDate(new Date()),
      lastActive: 0,
      workspace: ["Setup"],
      isSetup: true,
    }));

    return [...mappedSetupUsers, ...users];
  }, [setupUsers]);

  return <Users users={allUsers} />;
}
