import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PasswordStrength } from "@/hooks/use-password-strength";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  className?: string;
}

export function PasswordStrengthIndicator({ strength, className }: PasswordStrengthIndicatorProps) {
  const metCount = strength.requirements.filter((r) => r.met).length;
  const total = strength.requirements.length;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Bar */}
      <div className="space-y-1.5">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static length-5 array
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                i < metCount ? strength.barColor : "bg-muted",
              )}
            />
          ))}
        </div>
        {metCount > 0 && (
          <p className={cn("font-medium text-xs", strength.color)}>
            {strength.label} ({metCount}/{total})
          </p>
        )}
      </div>

      {/* Checklist */}
      <div className="grid gap-1">
        {strength.requirements.map((req) => (
          <div key={req.id} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="size-3.5 shrink-0 text-emerald-500" />
            ) : (
              <X className="size-3.5 shrink-0 text-muted-foreground/50" />
            )}
            <span className={cn(req.met ? "text-foreground" : "text-muted-foreground")}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
