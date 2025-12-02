import { useTokenStore } from "@/foundation/tokens/tokenStore";
import { resolveTokenValue } from "@/foundation/tokens/resolveToken";

export function resolveStyleValue(value) {
  if (typeof value === "string" && value.startsWith("$")) {
    const tokenId = value.slice(1);
    const { tokens, themes, activeTheme } = useTokenStore.getState();
    const themeValues = themes?.[activeTheme] ?? {};
    const resolved = resolveTokenValue(tokenId, tokens, themeValues);
    return resolved ?? value;
  }

  return value;
}
