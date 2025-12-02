export function extractLayerFeatures(obj = {}) {
  const width = Math.round(
    obj.width ? obj.width * (obj.scaleX || 1) : obj.getScaledWidth ? obj.getScaledWidth() : 0
  );
  const height = Math.round(
    obj.height ? obj.height * (obj.scaleY || 1) : obj.getScaledHeight ? obj.getScaledHeight() : 0
  );

  let primaryColor = null;
  if (obj.fill && typeof obj.fill === "string") {
    primaryColor = obj.fill;
  }

  const text = obj.text ? `${obj.text}`.trim().slice(0, 80) : null;

  return {
    type: obj.type,
    width,
    height,
    fontSize: obj.fontSize || null,
    fontWeight: obj.fontWeight || obj.fontWeight === 0 ? obj.fontWeight : null,
    stroke: obj.stroke || null,
    primaryColor,
    text,
    childCount: Array.isArray(obj._objects) ? obj._objects.length : 0,
  };
}
