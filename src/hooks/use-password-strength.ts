export type PasswordRequirement = {
  id: string;
  label: string;
  met: boolean;
};

export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
  color: string;
  barColor: string;
  requirements: PasswordRequirement[];
};

export function getPasswordStrength(password: string): PasswordStrength {
  const requirements: PasswordRequirement[] = [
    { id: "length", label: "Pelo menos 8 caracteres", met: password.length >= 8 },
    { id: "uppercase", label: "Pelo menos 1 letra maiúscula", met: /[A-Z]/.test(password) },
    { id: "lowercase", label: "Pelo menos 1 letra minúscula", met: /[a-z]/.test(password) },
    { id: "number", label: "Pelo menos 1 número", met: /[0-9]/.test(password) },
    { id: "special", label: "Pelo menos 1 caractere especial (!@#$%^&*)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  const levels = [
    { score: 0 as const, label: "Muito fraca", color: "text-destructive", barColor: "bg-destructive" },
    { score: 1 as const, label: "Fraca", color: "text-orange-500", barColor: "bg-orange-500" },
    { score: 2 as const, label: "Razoável", color: "text-yellow-600", barColor: "bg-yellow-500" },
    { score: 3 as const, label: "Forte", color: "text-emerald-500", barColor: "bg-emerald-500" },
    { score: 4 as const, label: "Muito forte", color: "text-emerald-600", barColor: "bg-emerald-600" },
    { score: 5 as const, label: "Excelente", color: "text-emerald-700", barColor: "bg-emerald-700" },
  ];

  const level = levels[metCount] ?? levels[0];
  return { ...level, requirements };
}
