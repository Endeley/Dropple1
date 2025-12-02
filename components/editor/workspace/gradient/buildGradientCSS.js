export const buildGradientCSS = (g) => {
  const stops = (g.stops || []).map(
    (s) =>
      `${s.color}${Math.round((s.opacity ?? 1) * 255)
        .toString(16)
        .padStart(2, "0")} ${Math.round((s.offset || 0) * 100)}%`
  );
  if (g.type === "linear") return `linear-gradient(${g.angle || 0}deg, ${stops.join(", ")})`;
  if (g.type === "radial") return `radial-gradient(circle at center, ${stops.join(", ")})`;
  return `conic-gradient(from ${g.angle || 0}deg, ${stops.join(", ")})`;
};
