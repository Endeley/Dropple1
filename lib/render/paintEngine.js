import { colorEngine } from "./colorEngine";

export function paintEngine(layout, data = {}) {
  const colors = colorEngine(data);

  const canvas = {
    width: layout.width,
    height: layout.height,
    layers: [],
    colors,
  };

  canvas.layers.push({
    type: "background",
    color: colors.background,
    gradient: data?.effects?.backgroundGradient || null,
  });

  return canvas;
}
