import { resolveStyleValue } from "../resolveStyleValue";

export function renderFrame(ctx, layer) {
  if (layer.fills?.length) {
    const color = resolveStyleValue(layer.fills[0].color || "#f5f5f5");
    ctx.fillStyle = color || "#f5f5f5";
    ctx.fillRect(0, 0, layer.width, layer.height);
  }
}
