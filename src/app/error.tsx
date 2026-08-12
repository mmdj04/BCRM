"use client";

import { useEffect } from "react";

import { ErrorDisplay } from "@/components/error-display";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("[Route Error]", error);
  }, [error]);

  // Detect error type for better messaging
  const getErrorInfo = (err: Error) => {
    const message = err.message || "Erro desconhecido";

    // Chunk loading error (dynamic import failure)
    if (message.includes("Loading chunk") || message.includes("Failed to fetch dynamically imported module")) {
      return {
        title: "Erro ao carregar módulo",
        message: "Falha ao carregar um componente. Isso pode ter acontecido após uma atualização.",
      };
    }

    // Network error
    if (message.includes("Failed to fetch") || message.includes("NetworkError") || message.includes("Network request failed")) {
      return {
        title: "Erro de conexão",
        message: "Verifique sua conexão com a internet e tente novamente.",
      };
    }

    // Authentication error
    if (message.includes("401") || message.includes("Unauthorized") || message.includes("autenticação")) {
      return {
        title: "Sessão expirada",
        message: "Sua sessão expirou. Faça login novamente.",
      };
    }

    // Permission error
    if (message.includes("403") || message.includes("Forbidden") || message.includes("permissão")) {
      return {
        title: "Acesso negado",
        message: "Você não tem permissão para acessar este recurso.",
      };
    }

    // Not found
    if (message.includes("404") || message.includes("Not Found")) {
      return {
        title: "Recurso não encontrado",
        message: "O recurso solicitado não foi encontrado.",
      };
    }

    // Server error
    if (message.includes("500") || message.includes("Internal Server Error")) {
      return {
        title: "Erro interno do servidor",
        message: "Ocorreu um erro no servidor. Tente novamente em alguns instantes.",
      };
    }

    return {
      title: "Erro na página",
      message: message,
    };
  };

  const { title, message } = getErrorInfo(error);

  return (
    <ErrorDisplay
      title={title}
      message={message}
      stack={error.stack}
      digest={error.digest}
      onRestart={reset}
    />
  );
}
