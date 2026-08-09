"use client";

import { useMemo } from "react";

import { useSetupStorage } from "@/hooks/use-setup-storage";

import { Roles } from "./_components/roles";
import { type Role, roles as mockRoles } from "./_components/roles-table/data";

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function Page() {
  const { setupCustomRoles, setupUsers } = useSetupStorage();

  const roles = useMemo(() => {
    const now = new Date();
    const dateStr = formatDate(now);

    const customRoles: Role[] = setupCustomRoles.map((cr) => ({
      role: cr.name,
      group: "Personalizado",
      accessLevel: "Delimitado",
      users: setupUsers.filter((u) => u.role === cr.name).length,
      permissionSets: ["Personalizado"],
      lastReview: dateStr,
      owner: "Sistema",
      status: "Ativo" as const,
    }));

    return [...customRoles, ...mockRoles];
  }, [setupCustomRoles, setupUsers]);

  return <Roles roles={roles} />;
}
