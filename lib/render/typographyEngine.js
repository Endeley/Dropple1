export function typographyEngine(canvas, data = {}) {
  const typography = data.typography || {};

  canvas.layers.push({
    type: "typography",
    headlines: typography.display || {},
    body: typography.body || {},
    mono: typography.mono || {},
  });

  return canvas;
}
