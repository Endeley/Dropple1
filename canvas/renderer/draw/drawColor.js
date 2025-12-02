import { getFrameRect, getContent } from "./drawUtils";

export function drawColorSlot(ctx, slot) {
  const frame = getFrameRect(slot);
  const content = getContent(slot);
  ctx.save();
  ctx.fillStyle = content.fill || "#ffffff";
  ctx.fillRect(frame.x, frame.y, frame.width, frame.height);
  ctx.restore();
}
