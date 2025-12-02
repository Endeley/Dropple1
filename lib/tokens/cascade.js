const defaultTokens = {
  "color.primary": "#8B5CF6",
  "color.background.surface": "#0b0b12",
  "color.text.base": "#ffffff",
  "radius.md": "12px",
  "shadow.glow": "0 0 24px rgba(139,92,246,0.45)",
  "space.4": "16px",
};

export function resolveToken(key, context = {}) {
  const {
    layer,
    component,
    uikit,
    theme,
    brand,
    team,
    org,
  } = context;

  return (
    layer?.tokens?.[key] ??
    component?.tokens?.[key] ??
    uikit?.tokens?.[key] ??
    theme?.tokens?.[key] ??
    brand?.tokens?.[key] ??
    team?.tokens?.[key] ??
    org?.tokens?.[key] ??
    defaultTokens[key]
  );
}
