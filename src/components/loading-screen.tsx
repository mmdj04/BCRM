"use client";

import { useEffect, useState } from "react";

function getThemeFromCookie(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  const match = document.cookie.split("; ").find((c) => c.startsWith("theme_mode="));
  const value = match ? decodeURIComponent(match.split("=")[1]) : null;
  if (value === "light" || value === "dark") return value;
  if (value === "system" || !value) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("Iniciando sistema...");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const messages = ["Iniciando sistema...", "Carregando módulos...", "Conectando ao servidor...", "Preparando interface..."];

  useEffect(() => {
    setTheme(getThemeFromCookie());

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % messages.length;
      setStatus(messages[msgIdx]);
    }, 800);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  const bg = theme === "dark" ? "#09090b" : "#ffffff";
  const fg = theme === "dark" ? "#fafafa" : "#09090b";
  const muted = theme === "dark" ? "#71717a" : "#71717a";
  const barBg = theme === "dark" ? "rgba(250,250,250,0.1)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        padding: "24px",
        background: bg,
        color: fg,
        fontFamily: "var(--font-geist), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1,
        }}
      >
        BCRM
      </div>
      <div
        style={{
          width: "200px",
          height: "3px",
          background: barBg,
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
            background: `linear-gradient(90deg, transparent, ${fg}, transparent)`,
            borderRadius: "2px",
            animation: "loading-slide 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <div style={{ fontSize: "13px", color: muted, letterSpacing: "0.5px" }}>{status}</div>
      <style>{`@keyframes loading-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }`}</style>
    </div>
  );
}
