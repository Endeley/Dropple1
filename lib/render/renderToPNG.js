import { renderToSVG } from "./renderToSVG";

export function renderToPNG(canvas) {
  const svg = renderToSVG(canvas);
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}
