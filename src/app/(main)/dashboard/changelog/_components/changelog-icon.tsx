import Image from "next/image";
import { cn } from "@/lib/utils";

type ChangelogIconType = "feature" | "fix" | "maintenance";

const iconConfig: Record<
  ChangelogIconType,
  { src: string; alt: string; label: string }
> = {
  feature: {
    src: "/changelog/featured-v3-new-releases.svg",
    alt: "Novo recurso",
    label: "Funcionalidade",
  },
  fix: {
    src: "/changelog/featured-v3-improvements.svg",
    alt: "Melhoria",
    label: "Correção",
  },
  maintenance: {
    src: "/changelog/featured-v3-deprecations.svg",
    alt: "Manutenção",
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
    <Image
      src={config.src}
      alt={config.alt}
      width={32}
      height={32}
      className={cn("shrink-0 rounded-md", className)}
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
