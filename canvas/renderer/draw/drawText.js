import { getFrameRect, getContent, wrapText } from "./drawUtils";

function getLineWidth(ctx, line, letterSpacing) {
  if (!letterSpacing) {
    return ctx.measureText(line).width;
  }
  return line.split("").reduce((acc, char, index) => {
    const width = ctx.measureText(char).width;
    const spacing = index < line.length - 1 ? letterSpacing : 0;
    return acc + width + spacing;
  }, 0);
}

function drawLineWithSpacing(ctx, line, startX, y, letterSpacing) {
  if (!letterSpacing) {
    ctx.fillText(line, startX, y);
    return;
  }

  let x = startX;
  for (const char of line) {
    ctx.fillText(char, x, y);
    x += ctx.measureText(char).width + letterSpacing;
  }
}

export function drawText(ctx, slot) {
  const frame = getFrameRect(slot);
  const content = getContent(slot);

  ctx.save();
  const fontSize = content.fontSize || 32;
  const fontFamily = content.fontFamily || "Inter";
  const weight = content.bold ? "bold" : "normal";
  const style = content.italic ? "italic" : "normal";
  const align = content.align || "left";
  const lineHeight = (content.lineHeight || 1.3) * fontSize;
  const letterSpacing = content.letterSpacing || 0;

  ctx.fillStyle = content.color || "#111111";
  ctx.font = `${style} ${weight} ${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  let lines = (content.text || "").split("\n");
  if (content.wrap !== false) {
    lines = lines.flatMap((line) => wrapText(line, frame.width, ctx));
  }

  let offsetY = 0;

  lines.forEach((line) => {
    const lineWidth = getLineWidth(ctx, line, letterSpacing);
    let startX = frame.x;

    if (align === "center") {
      startX = frame.x + frame.width / 2 - lineWidth / 2;
    } else if (align === "right") {
      startX = frame.x + frame.width - lineWidth;
    }

    drawLineWithSpacing(ctx, line, startX, frame.y + offsetY, letterSpacing);

    if (content.underline) {
      const underlineY = frame.y + offsetY + fontSize * 1.1;
      ctx.fillRect(startX, underlineY, lineWidth, Math.max(1, fontSize * 0.08));
    }

    offsetY += lineHeight;
  });

  ctx.restore();
}
