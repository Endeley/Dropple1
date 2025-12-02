export function createMaskCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  return { canvas, ctx };
}

export function applyBrushToMask(ctx, x, y, size, hardness, mode) {
  if (!ctx) return;

  ctx.save();
  ctx.globalCompositeOperation = mode === "erase" ? "destination-out" : "source-over";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(hardness, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
