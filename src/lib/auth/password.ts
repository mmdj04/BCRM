import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): {
  valid: boolean;
  score: number;
  errors: string[];
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else errors.push("Mínimo de 8 caracteres");

  if (/[A-Z]/.test(password)) score++;
  else errors.push("Pelo menos uma letra maiúscula");

  if (/[a-z]/.test(password)) score++;
  else errors.push("Pelo menos uma letra minúscula");

  if (/[0-9]/.test(password)) score++;
  else errors.push("Pelo menos um número");

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else errors.push("Pelo menos um caractere especial");

  return {
    valid: score >= 4,
    score,
    errors,
  };
}
