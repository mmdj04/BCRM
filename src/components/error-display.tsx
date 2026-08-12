"use client";

import { useCallback, useEffect, useState } from "react";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  stack?: string;
  digest?: string;
  version?: string;
  onRestart?: () => void;
  onReport?: () => void;
}

export function ErrorDisplay({
  title = "Algo deu errado",
  message = "Ocorreu um erro ao carregar a aplicação.",
  stack,
  digest,
  version = "1.0.0",
  onRestart,
  onReport,
}: ErrorDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showStack, setShowStack] = useState(true);

  const fullError = [
    title,
    message,
    digest ? `Digest: ${digest}` : "",
    "",
    stack || "No stack trace available.",
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullError);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = fullError;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fullError]);

  const handleRestart = useCallback(() => {
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  }, [onRestart]);

  const handleReport = useCallback(() => {
    if (onReport) {
      onReport();
    } else {
      const text = [
        `*Bug Report: ${title}*`,
        "",
        `Mensagem: ${message}`,
        digest ? `Digest: ${digest}` : "",
        "",
        "Stack Trace:",
        "```",
        stack || "No stack trace available.",
        "```",
        "",
        `URL: ${typeof window !== "undefined" ? window.location.href : "N/A"}`,
        `Versão: ${version}`,
      ]
        .filter(Boolean)
        .join("\n");

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/5521974699723?text=${encoded}`, "_blank");
    }
  }, [onReport, title, message, digest, stack, version]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleRestart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRestart]);

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
      <h1 className="mb-2 font-semibold text-xl text-white">{title}</h1>
      <p className="mb-8 text-sm text-gray-400">{message}</p>

      {/* Error log box */}
      <div className="mb-8 w-full max-w-2xl">
        <div className="relative rounded-lg border border-gray-800 bg-[#111111]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
            <span className="font-mono text-xs text-gray-500">error.log</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowStack(!showStack)}
                className="rounded px-2 py-0.5 font-mono text-xs text-gray-500 transition-colors hover:bg-gray-800 hover:text-gray-300"
              >
                {showStack ? "Recolher" : "Expandir"}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-800 hover:text-gray-300"
                title="Copiar erro"
              >
                {copied ? (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error content */}
          {showStack && (
            <div className="overflow-auto p-4" style={{ maxHeight: "400px" }}>
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-red-400">
                {stack || message}
              </pre>
              {digest && (
                <div className="mt-3 border-t border-gray-800 pt-3">
                  <span className="font-mono text-xs text-gray-500">Digest: {digest}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleRestart}
          className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 font-medium text-sm text-white transition-all hover:border-gray-600 hover:bg-gray-700 active:scale-[0.98]"
        >
          Reiniciar
        </button>
        <button
          type="button"
          onClick={handleReport}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-sm text-white transition-all hover:bg-indigo-500 active:scale-[0.98]"
        >
          Reportar erro
        </button>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Por favor, reporte este erro para a equipe do BCRM no{" "}
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300"
        >
          WhatsApp
        </a>
      </p>
      <p className="mt-1 font-mono text-xs text-gray-600">Versão: {version}</p>
    </div>
  );
}
