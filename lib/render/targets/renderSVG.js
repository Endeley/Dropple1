import { renderToSVG } from "../renderToSVG";

export function renderSVG({ scene, width, height }) {
  const svg = renderToSVG({ width, height, scene });
  return {
    type: "svg",
    width,
    height,
    svg,
  };
}
