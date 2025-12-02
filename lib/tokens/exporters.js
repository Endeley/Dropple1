export function toCSSVariables(tokens = {}) {
  const lines = Object.entries(tokens).map(([k, v]) => `  --${k.replace(/\./g, "-")}: ${v};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

export function toTailwind(tokens = {}) {
  const colors = {};
  const radius = {};
  const spacing = {};

  Object.entries(tokens).forEach(([k, v]) => {
    if (k.startsWith("color.")) colors[k.replace("color.", "")] = v;
    if (k.startsWith("radius.")) radius[k.replace("radius.", "")] = v;
    if (k.startsWith("space.")) spacing[k.replace("space.", "")] = v;
  });

  return {
    theme: {
      extend: {
        colors,
        borderRadius: radius,
        spacing,
      },
    },
  };
}

export function toThemeObject(tokens = {}) {
  return tokens;
}
