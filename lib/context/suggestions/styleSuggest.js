export function suggestStyles(state = {}) {
  const brand = state.brand || "Default";
  const has3D = (state.layers || []).some((l) => l.type === "3d");
  const palette = brand === "Default" ? "Vibrant Violet" : `${brand} Core`;

  return [
    `Palette: ${palette}`,
    has3D ? "Apply soft neon rim light" : "Use soft drop shadow",
    "Try rounded corners",
  ];
}
