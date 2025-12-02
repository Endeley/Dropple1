"use client";

import { useTokenStore } from "@/foundation/tokens/tokenStore";

function safeUpdateToken(id, patch) {
  const { tokens, updateToken } = useTokenStore.getState();
  if (!tokens?.[id]) return;
  updateToken(id, patch);
}

export function applyBrandToTokens(brand) {
  if (!brand) return;
  const { colors = {}, fonts = {}, style } = brand;

  // Color mappings
  const colorMap = {
    "primary.brand": colors.primary,
    "primary.600": colors.secondary,
    "accent.brand": colors.accent,
    "neutral.500": colors.neutral,
    "text.default": colors.neutral ? "#ffffff" : undefined,
  };

  Object.entries(colorMap).forEach(([tokenId, value]) => {
    if (value) {
      safeUpdateToken(tokenId, { value });
    }
  });

  // Typography tokens
  if (fonts.heading) {
    safeUpdateToken("text.heading", {
      value: {
        fontFamily: fonts.heading,
      },
    });
  }
  if (fonts.body) {
    safeUpdateToken("text.body", {
      value: {
        fontFamily: fonts.body,
      },
    });
  }

  // Radius tokens mapped from style
  const radiusMap = {
    rounded: 12,
    soft: 8,
    sharp: 0,
    playful: 16,
  };
  if (style && radiusMap[style] != null) {
    safeUpdateToken("radius.default", { value: radiusMap[style] });
  }
}
