"use client";

import { useMemo } from "react";
import { useTokenStore } from "./tokenStore";

export function useTokens() {
  const tokens = useTokenStore((state) => state.tokens);
  const activeTheme = useTokenStore((state) => state.activeTheme);
  const themes = useTokenStore((state) => state.themes);

  const themeValues = themes[activeTheme] ?? {};

  return useMemo(
    () => ({
      tokens,
      activeTheme,
      themeValues,
    }),
    [tokens, activeTheme, themeValues]
  );
}
