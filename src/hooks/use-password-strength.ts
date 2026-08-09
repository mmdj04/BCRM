export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
};

function getScore(password: string): 0 | 1 | 2 | 3 | 4 {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
}

const labels = ["Muito fraca", "Fraca", "Razoável", "Forte", "Muito forte"];
const colors = ["bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-emerald-500", "bg-emerald-600"];

export function getPasswordStrength(password: string): PasswordStrength {
  const score = getScore(password);
  return { score, label: labels[score], color: colors[score] };
}
