"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import type { Session, User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isDemo: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isDemo: false,
  signOut: async () => {
    // Default no-op sign out
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const supabase = createClient();

  const signOut = useCallback(async () => {
    // Clear demo session if exists
    localStorage.removeItem("bcrm_demo_session");
    await supabase.auth.signOut();
    window.location.href = "/auth/v1/login";
  }, [supabase]);

  useEffect(() => {
    // Check for demo session first
    const demoSession = localStorage.getItem("bcrm_demo_session");
    if (demoSession) {
      const parsed = JSON.parse(demoSession);
      setUser(parsed.user as User);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setIsDemo(false);
      setLoading(false);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return <AuthContext.Provider value={{ user, session, loading, isDemo, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
