"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function NotFound() {
  const router = useRouter();

  const handleRestart = useCallback(() => {
    router.push("/dashboard/default");
  }, [router]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0a0a0a] p-6 text-white">
      {/* Logo */}
      <div className="mb-8 select-none">
        <span
          className="font-mono text-3xl font-bold tracking-wider"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          bcrm
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-2 font-semibold text-xl text-white">Página não encontrada</h1>
      <p className="mb-8 text-sm text-gray-400">A página que você procura não existe ou foi movida.</p>

      {/* Error log box */}
      <div className="mb-8 w-full max-w-2xl">
        <div className="rounded-lg border border-gray-800 bg-[#111111]">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
            <span className="font-mono text-xs text-gray-500">error.log</span>
          </div>
          <div className="overflow-auto p-4">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-amber-400">
              {`Error: 404 - Page Not Found
  The requested URL "${typeof window !== "undefined" ? window.location.pathname : "/"}" was not found on this server.

  Possible causes:
  - The page may have been moved or deleted
  - The URL might be incorrect
  - You may have followed an outdated link

  Available pages:
  - /dashboard/default
  - /dashboard/analytics
  - /dashboard/crm
  - /dashboard/finance
  - /dashboard/users
  - /dashboard/profile`}
            </pre>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleRestart}
          className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 font-medium text-sm text-white transition-all hover:border-gray-600 hover:bg-gray-700 active:scale-[0.98]"
        >
          Ir para o início
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-sm text-white transition-all hover:bg-indigo-500 active:scale-[0.98]"
        >
          Voltar
        </button>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Se você acredita que isto é um erro, reporte no{" "}
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300"
        >
          WhatsApp
        </a>
      </p>
      <p className="mt-1 font-mono text-xs text-gray-600">Versão: 1.0.0</p>
    </div>
  );
}
