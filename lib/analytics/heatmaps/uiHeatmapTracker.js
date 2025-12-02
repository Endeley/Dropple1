const clicks = [];

export function logClick(x, y) {
  clicks.push({ x, y, ts: Date.now() });
  if (clicks.length > 5000) clicks.shift();
  return clicks;
}

export function getHeatmap() {
  return [...clicks];
}
