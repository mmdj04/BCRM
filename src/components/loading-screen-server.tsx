import { cookies } from "next/headers";

import { LoadingScreenClient } from "@/components/loading-screen";

export async function LoadingScreen() {
  const cookieStore = await cookies();
  const themeMode = cookieStore.get("theme_mode")?.value;

  let resolvedTheme: "light" | "dark" = "light";
  if (themeMode === "dark") {
    resolvedTheme = "dark";
  } else if (themeMode === "light") {
    resolvedTheme = "light";
  }

  return <LoadingScreenClient initialTheme={resolvedTheme} />;
}
