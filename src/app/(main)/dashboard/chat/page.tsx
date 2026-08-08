import Link from "next/link";

import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-medium text-sm leading-none">Pré-visualização de chat</h1>
          <p className="text-muted-foreground text-sm">
            Este iframe mostra a tela de chat independente. Abra em tela cheia para uma melhor visualização.
          </p>
        </div>
        <Button asChild variant="ghost" size="icon-sm">
          <Link href="/chat" target="_blank" rel="noreferrer" aria-label="Abrir chat em nova aba">
            <ExternalLink />
          </Link>
        </Button>
      </div>

      <iframe src="/chat" title="Pré-visualização de chat" className="min-h-0 flex-1 rounded-lg border bg-background" />
    </div>
  );
}
