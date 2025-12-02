export function effectsEngine(canvas, data = {}) {
  const effects = data.effects || [];
  const animations = data.animation || data.animation_hooks || [];

  if (effects.length || animations.length) {
    canvas.layers.push({
      type: "effects",
      effects,
      animations,
    });
  }

  return canvas;
}
