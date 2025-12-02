// Shared canvas context for text measurement. Falls back to a naive
// approximation when running in non-browser environments.
let ctx = null;

if (typeof document !== "undefined") {
  const canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
}

/**
 * Set the current font used for measurements, e.g. "16px Inter".
 */
export function setFont(fontString) {
  if (ctx) {
    ctx.font = fontString;
  }
}

/**
 * Measure a single character, returning metrics used downstream for
 * word boxes, layout, and selection.
 */
export function measureChar(char) {
  if (!ctx) {
    // Fallback: approximate width based on UTF-16 code units.
    const width = Math.max(8, String(char).length * 8);
    return {
      char,
      width,
      asc: 12,
      desc: 4,
      left: 0,
      right: width,
      height: 16,
    };
  }

  const metrics = ctx.measureText(char);
  const asc = metrics.actualBoundingBoxAscent || 0;
  const desc = metrics.actualBoundingBoxDescent || 0;
  const left = metrics.actualBoundingBoxLeft || 0;
  const right = metrics.actualBoundingBoxRight || metrics.width;

  return {
    char,
    width: metrics.width,
    asc,
    desc,
    left,
    right,
    height: asc + desc,
  };
}
