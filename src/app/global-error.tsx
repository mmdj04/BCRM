"use client";

import { ErrorDisplay } from "@/components/error-display";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ErrorDisplay
          title="Algo deu errado"
          message={error.message || "Ocorreu um erro ao carregar a aplicação."}
          stack={error.stack}
          digest={error.digest}
          onRestart={reset}
        />
      </body>
    </html>
  );
}
