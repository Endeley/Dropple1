import { drawText } from "./draw/drawText";
import { drawImageSlot } from "./draw/drawImage";
import { drawSurface } from "./draw/drawSurface";
import { drawColorSlot } from "./draw/drawColor";

export async function renderTemplateToCanvas(definition, options = {}) {
  if (typeof document === "undefined") {
    throw new Error("renderTemplateToCanvas requires a browser environment");
  }

  const { width, height, slots = [] } = definition || {};
  const baseWidth = width || 1024;
  const baseHeight = height || 1024;

  let scale = options.scale || 1;
  if (options.width && options.height) {
    scale = Math.min(options.width / baseWidth, options.height / baseHeight);
  } else if (options.width) {
    scale = options.width / baseWidth;
  } else if (options.height) {
    scale = options.height / baseHeight;
  }
  if (!Number.isFinite(scale) || scale <= 0) scale = 1;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(baseWidth * scale));
  canvas.height = Math.max(1, Math.round(baseHeight * scale));

  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, baseWidth, baseHeight);

  for (const slot of slots) {
    switch (slot.type) {
      case "text.heading":
      case "text.body":
        drawText(ctx, slot);
        break;
      case "image":
      case "logo":
        await new Promise((resolve) => {
          drawImageSlot(ctx, slot, resolve);
        });
        break;
      case "surface":
        drawSurface(ctx, slot);
        break;
      case "color.background":
      case "color.primary":
        drawColorSlot(ctx, slot);
        break;
      default:
        break;
    }
  }

  return canvas;
}
