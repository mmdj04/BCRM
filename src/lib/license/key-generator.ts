const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateLicenseKey(): string {
  const segments = 4;
  const segmentLength = 4;

  const key = Array.from({ length: segments }, () =>
    Array.from({ length: segmentLength }, () =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("")
  ).join("-");

  return `BCRM-${key}`;
}

export function getExpirationDate(interval: string): Date {
  const now = new Date();
  switch (interval) {
    case "monthly":
      return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    case "quarterly":
      return new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
    case "annual":
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    default:
      return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
}

export function getIntervalLabel(interval: string): string {
  switch (interval) {
    case "monthly": return "1 mês";
    case "quarterly": return "3 meses";
    case "annual": return "12 meses";
    default: return "1 mês";
  }
}