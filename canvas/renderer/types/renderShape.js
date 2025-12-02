import { resolveStyleValue } from "../resolveStyleValue";

export function renderShape(ctx, layer) {
  const fill = resolveStyleValue(layer.fills?.[0]?.color || "#cccccc");
  ctx.fillStyle = fill || "#cccccc";
  ctx.beginPath();
  ctx.rect(0, 0, layer.width, layer.height);
  ctx.fill();

  if (layer.strokes?.length) {
    const stroke = resolveStyleValue(layer.strokes[0].color || "#000000");
    ctx.strokeStyle = stroke || "#000000";
    ctx.lineWidth = layer.strokeWidth || 1;
    ctx.stroke();
  }
}
