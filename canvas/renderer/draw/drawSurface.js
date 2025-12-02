import { getFrameRect, getContent } from "./drawUtils";

export function drawSurface(ctx, slot) {
  const frame = getFrameRect(slot);
  const content = getContent(slot);
  const { x, y, width, height } = frame;

  ctx.save();

  if (content.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
  }

  const radius = content.radius || 0;

  ctx.fillStyle = content.fill || "#ffffff";
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fill();

  if (content.text) {
    ctx.shadowColor = "transparent";
    ctx.fillStyle = content.textColor || "#111";
    ctx.font = `${content.textSize || 22}px ${content.fontFamily || "Inter"}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = content.align || "center";
    const tx = content.align === "left" ? x + 16 : content.align === "right" ? x + width - 16 : x + width / 2;
    const ty = y + height / 2;
    ctx.fillText(content.text, tx, ty);
  }

  ctx.restore();
}

function roundedRect(ctx, x, y, width, height, radius = 0) {
  const r = Math.min(radius, Math.min(width, height) / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
