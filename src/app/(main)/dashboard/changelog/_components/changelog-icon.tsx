import { cn } from "@/lib/utils";

type ChangelogIconType = "feature" | "fix" | "maintenance";

const iconConfig: Record<
  ChangelogIconType,
  { color: string; label: string }
> = {
  feature: {
    color: "bg-blue-500",
    label: "Funcionalidade",
  },
  fix: {
    color: "bg-green-500",
    label: "Correção",
  },
  maintenance: {
    color: "bg-red-500",
    label: "Manutenção",
  },
};

export function ChangelogIcon({
  type,
  className,
}: {
  type: ChangelogIconType;
  className?: string;
}) {
  const config = iconConfig[type];

  return (
    <span
      className={cn("inline-block size-2.5 shrink-0 rounded-full", config.color, className)}
      aria-label={config.label}
    />
  );
}

export function getChangelogTypeFromContent(content: string): ChangelogIconType {
  const lower = content.toLowerCase();
  if (lower.includes("### funcionalidade") || lower.includes("feat:")) {
    return "feature";
  }
  if (lower.includes("### correç") || lower.includes("fix:")) {
    return "fix";
  }
  if (lower.includes("### manutenç") || lower.includes("chore:") || lower.includes("ci(deps):")) {
    return "maintenance";
  }
  return "feature";
}
