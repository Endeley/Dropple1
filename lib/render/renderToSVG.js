export function renderToSVG(canvas) {
  const width = canvas.width || 1080;
  const height = canvas.height || 1080;
  const bg = canvas.colors?.background || "#0b0b12";
  const primary = canvas.colors?.primary || "#8B5CF6";
  const text = canvas.colors?.text || "#ffffff";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.9" />
      <stop offset="100%" stop-color="${text}" stop-opacity="0.2" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="${width * 0.08}" y="${height * 0.12}" width="${width * 0.84}" height="${height * 0.3}" rx="32" fill="url(#grad)" opacity="0.6"/>
  <text x="${width * 0.1}" y="${height * 0.25}" fill="${text}" font-size="${Math.max(
    32,
    Math.round(width / 28)
  )}" font-family="Inter, sans-serif" font-weight="700">Template Preview</text>
  <text x="${width * 0.1}" y="${height * 0.3}" fill="${text}" font-size="${Math.max(
    16,
    Math.round(width / 60)
  )}" font-family="Inter, sans-serif" opacity="0.8">Auto-rendered placeholder (enable GPU renderer for full fidelity).</text>
</svg>
`.trim();

  return svg;
}
