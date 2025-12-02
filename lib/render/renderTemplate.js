import { layoutEngine } from "./layoutEngine";
import { paintEngine } from "./paintEngine";
import { typographyEngine } from "./typographyEngine";
import { shapeEngine } from "./shapeEngine";
import { effectsEngine } from "./effectsEngine";
import { renderToCanvas } from "./renderToCanvas";
import { renderToPNG } from "./renderToPNG";
import { renderToSVG } from "./renderToSVG";
import { toSceneGraph } from "./sceneGraph";
import { selectRenderer } from "./rendererSelector";

const fallbackImage = () => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="#0b0b12"/>
  <circle cx="400" cy="320" r="220" fill="url(#g)" opacity="0.7"/>
  <rect x="140" y="440" width="520" height="200" rx="32" fill="#111326" stroke="#3b82f6" stroke-opacity="0.4"/>
  <text x="170" y="520" fill="#e5e7eb" font-size="42" font-family="Inter, sans-serif" font-weight="700">Auto-render preview</text>
  <text x="170" y="565" fill="#9ca3af" font-size="24" font-family="Inter, sans-serif">Provide template JSON to render a themed thumbnail.</text>
</svg>
  `.trim();
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

export async function renderTemplate(data = {}) {
  try {
    const layout = layoutEngine(data);
    let canvas = paintEngine(layout, data);
    canvas = typographyEngine(canvas, data);
    canvas = shapeEngine(canvas, data);
    canvas = effectsEngine(canvas, data);
    const rendered = renderToCanvas(canvas);
    const scene = toSceneGraph(data?.layers || data?.layout?.blocks || []);
    const targetRenderer = selectRenderer(data.target || (data.format === "svg" ? "svg" : "edit"));

    const format = data.format || "png";
    if (targetRenderer && targetRenderer !== renderToCanvas) {
      return targetRenderer({
        scene,
        width: layout.width,
        height: layout.height,
      });
    }

    if (format === "svg") {
      return renderToSVG(rendered);
    }
    return renderToPNG(rendered);
  } catch (err) {
    console.error("RenderTemplate error", err);
    return fallbackImage();
  }
}
