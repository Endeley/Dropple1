export function shapeEngine(canvas, data = {}) {
  const shapes = data.shapes || data.shape_language || [];
  if (shapes.length) {
    canvas.layers.push({
      type: "shapes",
      shapes,
    });
  }
  return canvas;
}
