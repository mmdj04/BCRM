"use client";

import { useState } from "react";

export default function TestErrorPage() {
  const [errorType, setErrorType] = useState<string | null>(null);

  const throwReactError = () => {
    setErrorType("react");
    throw new Error("Este é um erro de teste do React Error Boundary! O componente falhou propositalmente.");
  };

  const throwChunkError = () => {
    // Simulate a chunk loading error
    const err = new Error("Loading chunk chunk-abc123 failed. (Missing: https://bcrm-lilac.vercel.app/_next/static/chunk-abc123.js)");
    err.name = "ChunkError";
    throw err;
  };

  const throwNetworkError = () => {
    const err = new Error("Failed to fetch: NetworkError when attempting to fetch resource.");
    err.name = "NetworkError";
    throw err;
  };

  const throwAuthError = () => {
    const err = new Error("401 Unauthorized: Sessão expirada. Faça login novamente.");
    err.name = "AuthError";
    throw err;
  };

  const throwGenericError = () => {
    throw new Error("Erro genérico de teste! Algo quebrou de forma inesperada.");
  };

  const triggerUnhandledRejection = () => {
    Promise.reject(new Error("Unhandled Promise Rejection de teste!"));
  };

  const triggerConsoleError = () => {
    console.error("[TEST] Este é um erro de teste no console:", { code: 500, details: "Simulação de erro" });
  };

  const triggerDOMError = () => {
    const el = document.getElementById("nonexistent-element-that-will-never-exist");
    if (el) el.remove(); // This won't execute, but tests null handling
    // Force a DOM error
    document.createElement("div").remove(); // Noop, but let's do something that errors
    throw new Error("DOM Error: Cannot read properties of null (reading 'removeChild')");
  };

  const buttons = [
    { label: "React Error Boundary", description: "Erro capturado pelo error.tsx", action: throwReactError, color: "bg-red-600 hover:bg-red-500" },
    { label: "Chunk Loading Error", description: "Falha ao carregar módulo dinâmico", action: throwChunkError, color: "bg-orange-600 hover:bg-orange-500" },
    { label: "Network Error", description: "Falha de conexão com a internet", action: throwNetworkError, color: "bg-yellow-600 hover:bg-yellow-500" },
    { label: "Auth Error (401)", description: "Sessão expirada / não autenticado", action: throwAuthError, color: "bg-purple-600 hover:bg-purple-500" },
    { label: "Erro Genérico", description: "Erro qualquer para teste", action: throwGenericError, color: "bg-pink-600 hover:bg-pink-500" },
    { label: "Promise Rejection", description: "Unhandled promise rejection", action: triggerUnhandledRejection, color: "bg-indigo-600 hover:bg-indigo-500" },
    { label: "Console Error", description: "Apenas loga erro no console", action: triggerConsoleError, color: "bg-gray-600 hover:bg-gray-500" },
    { label: "DOM Error", description: "Erro de manipulação do DOM", action: triggerDOMError, color: "bg-teal-600 hover:bg-teal-500" },
  ];

  if (errorType === "react") {
    throw new Error("Este é um erro de teste do React Error Boundary! O componente falhou propositalmente.");
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0a0a0a] p-6 text-white">
      {/* Logo */}
      <div className="mb-8 select-none">
        <span
          className="font-bold font-mono text-3xl tracking-wider"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          bcrm
        </span>
      </div>

      <h1 className="mb-2 font-semibold text-white text-xl">Teste de Erros</h1>
      <p className="mb-8 text-center text-gray-400 text-sm max-w-md">
        Clique em qualquer botão abaixo para disparar um erro proposital e ver como o sistema de exibição de erros funciona.
      </p>

      {/* Error type grid */}
      <div className="mb-8 grid w-full max-w-2xl grid-cols-2 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            className={`rounded-lg px-4 py-3 text-left transition-all active:scale-[0.98] ${btn.color}`}
          >
            <div className="font-medium text-sm text-white">{btn.label}</div>
            <div className="mt-1 text-xs text-white/70">{btn.description}</div>
          </button>
        ))}
      </div>

      {/* 404 test */}
      <div className="mb-8 w-full max-w-2xl rounded-lg border border-gray-800 bg-[#111111] p-4">
        <h3 className="mb-2 font-medium text-sm text-white">Testar 404 (Not Found)</h3>
        <p className="mb-3 text-gray-400 text-xs">Visite qualquer URL inexistente para ver a página 404 customizada:</p>
        <code className="block rounded bg-gray-900 p-2 font-mono text-green-400 text-xs">
          https://bcrm-lilac.vercel.app/qualquer-coisa-inexistente
        </code>
      </div>

      {/* Console test */}
      <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-[#111111] p-4">
        <h3 className="mb-2 font-medium text-sm text-white">Testar pelo Console</h3>
        <p className="mb-3 text-gray-400 text-xs">Abra o console do navegador (F12) e cole:</p>
        <code className="block rounded bg-gray-900 p-2 font-mono text-green-400 text-xs whitespace-pre-wrap">
{`// Forçar erro não capturado
throw new Error("Erro manual do console!");

// Forçar promise rejection
Promise.reject(new Error("Promise reject!"));`}
        </code>
      </div>

      <p className="mt-6 text-center text-gray-500 text-xs">
        Nenhum dado é enviado. Apenas testa a UI de erro localmente.
      </p>
    </div>
  );
}
