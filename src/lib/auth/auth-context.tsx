"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { AuthPayload } from "./jwt";

type AuthContextValue = {
  user: AuthPayload | null;
  session: string | null;
  loading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  isDemo: false,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthPayload | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  // Load session from cookie on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        // Check demo mode first
        const demoCookie = document.cookie
          .split("; ")
          .find((c) => c.startsWith("bcrm_demo_session="));

        if (demoCookie) {
          const demoData = JSON.parse(decodeURIComponent(demoCookie.split("=")[1]));
          setUser({
            userId: demoData.id,
            email: demoData.email,
            name: demoData.name,
            role: demoData.role || "user",
          });
          setIsDemo(true);
          setLoading(false);
          return;
        }

        // Check JWT token
        const tokenCookie = document.cookie
          .split("; ")
          .find((c) => c.startsWith("bcrm_token="));

        if (tokenCookie) {
          const token = tokenCookie.split("=")[1];
          const response = await fetch("/api/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setSession(token);
          } else {
            // Invalid token, clear it
            document.cookie = "bcrm_token=; path=/; max-age=0";
          }
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Erro ao fazer login" };
      }

      // Set token cookie
      document.cookie = `bcrm_token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

      setUser(data.user);
      setSession(data.token);
      return {};
    } catch {
      return { error: "Erro ao conectar com o servidor" };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Erro ao criar conta" };
      }

      // Auto-login after registration
      return signIn(email, password);
    } catch {
      return { error: "Erro ao conectar com o servidor" };
    }
  }, [signIn]);

  const signOut = useCallback(() => {
    document.cookie = "bcrm_token=; path=/; max-age=0";
    document.cookie = "bcrm_demo_session=; path=/; max-age=0";
    setUser(null);
    setSession(null);
    setIsDemo(false);
    window.location.href = "/auth/v1/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, isDemo, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
