export function detectLayerType(object = {}) {
  if (object.type === "textbox" || object.type === "text" || object.type === "i-text") return "Text";
  if (object.type === "image") return "Image";
  if (object.type === "rect") return "Rectangle";
  if (object.type === "circle") return "Circle";
  if (object.type === "triangle") return "Triangle";
  if (object.type === "polygon") return "Polygon";
  if (object._objects?.length) return "Group";

  return "Unknown";
}
