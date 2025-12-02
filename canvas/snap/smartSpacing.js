export function computeSpacing(active, layer) {
  if (!active || !layer) return [];
  const spacing = [];

  const left = layer.x - (active.x + active.width);
  if (left > 0) spacing.push({ axis: "x", value: left, direction: "left" });

  const right = active.x - (layer.x + layer.width);
  if (right > 0) spacing.push({ axis: "x", value: right, direction: "right" });

  const top = layer.y - (active.y + active.height);
  if (top > 0) spacing.push({ axis: "y", value: top, direction: "up" });

  const bottom = active.y - (layer.y + layer.height);
  if (bottom > 0) spacing.push({ axis: "y", value: bottom, direction: "down" });

  return spacing;
}
