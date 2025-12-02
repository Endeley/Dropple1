export function classifyObject(layer = {}) {
  const name = (layer.name || "").toLowerCase();
  if (name.includes("button")) return "ui_button";
  if (name.includes("text") || layer.type === "text") return "text";
  if (name.includes("image") || layer.type === "image") return "image";
  if (layer.type === "3d") return "3d_object";
  return "generic";
}
