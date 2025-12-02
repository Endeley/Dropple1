import { resolveStyleValue } from "../resolveStyleValue";

export function renderText(ctx, layer) {
  const color = resolveStyleValue(layer.fills?.[0]?.color || "#000000");
  ctx.fillStyle = color || "#000000";
  ctx.font = `${layer.fontWeight || 400} ${layer.fontSize || 16}px ${
    layer.fontFamily || "Inter"
  }`;
  ctx.textAlign = layer.textAlign || "left";
  ctx.textBaseline = "top";
  ctx.fillText(layer.text || "", 0, 0, layer.width);
}
