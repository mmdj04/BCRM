import { cn } from "@/lib/utils";
import type { PasswordStrength } from "@/hooks/use-password-strength";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  className?: string;
}

export function PasswordStrengthIndicator({ strength, className }: PasswordStrengthIndicatorProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static array
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < strength.score ? strength.color : "bg-muted",
            )}
          />
        ))}
      </div>
      {strength.score > 0 && (
        <p className="text-muted-foreground text-xs">{strength.label}</p>
      )}
    </div>
  );
}
