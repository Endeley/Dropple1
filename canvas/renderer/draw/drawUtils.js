export function getFrameRect(slot) {
  const frame = slot?.frame || { x: 0, y: 0, width: 0, height: 0 };
  return {
    x: frame.x || 0,
    y: frame.y || 0,
    width: frame.width || 0,
    height: frame.height || 0,
  };
}

export function getContent(slot) {
  return slot?.content || {};
}

export function wrapText(text = "", maxWidth, ctx) {
  if (!maxWidth || !ctx) return text.split("\n");
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines;
}
