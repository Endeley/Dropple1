import { getFrameRect, getContent } from "./drawUtils";

const imageCache = new Map();

export function drawImageSlot(ctx, slot, onComplete) {
  const frame = getFrameRect(slot);
  const content = getContent(slot);
  const { x, y, width, height } = frame;

  if (!content.src) {
    drawPlaceholder(ctx, frame);
    if (onComplete) onComplete();
    return;
  }

  const cacheKey = `${slot?.id || "slot"}:${content.src}`;
  let imageRecord = imageCache.get(cacheKey);
  if (!imageRecord) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    imageRecord = { img, loaded: false };
    imageCache.set(cacheKey, imageRecord);
    img.onload = () => {
      imageRecord.loaded = true;
      if (onComplete) {
        drawImageSlot(ctx, slot, onComplete);
      } else {
        requestAnimationFrame(() => drawImageSlot(ctx, slot));
      }
    };
    img.onerror = () => {
      imageRecord.error = true;
      if (onComplete) onComplete();
    };
    img.src = content.src;
  }

  if (!imageRecord.loaded) {
    drawPlaceholder(ctx, frame);
    if (!onComplete) {
      return;
    }
    return;
  }

  ctx.save();
  ctx.drawImage(imageRecord.img, x, y, width, height);
  ctx.restore();

  if (onComplete) {
    onComplete();
  }
}

function drawPlaceholder(ctx, frame) {
  const { x, y, width, height } = frame;
  ctx.save();
  ctx.fillStyle = "#d4d4d8";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#a1a1aa";
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = "#71717a";
  ctx.font = "14px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Image", x + width / 2, y + height / 2);
  ctx.restore();
}
