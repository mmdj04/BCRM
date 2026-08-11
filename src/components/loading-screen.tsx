"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("Iniciando sistema...");

  const messages = ["Iniciando sistema...", "Carregando módulos...", "Conectando ao servidor...", "Preparando interface..."];

  useEffect(() => {
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
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 800,
            color: "#09090b",
            letterSpacing: "-1px",
            boxShadow: "0 0 40px rgba(250, 250, 250, 0.1)",
          }}
        >
          B
        </div>
      </div>
      <div style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "6px", textTransform: "uppercase" }}>BCRM</div>
      <div
        style={{
          width: "200px",
          height: "3px",
          background: "rgba(250, 250, 250, 0.1)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
            background: "linear-gradient(90deg, transparent, #fafafa, transparent)",
            borderRadius: "2px",
            animation: "loading-slide 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <div style={{ fontSize: "13px", color: "#71717a", letterSpacing: "0.5px" }}>{status}</div>
      <style>{`@keyframes loading-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }`}</style>
    </div>
  );
}
