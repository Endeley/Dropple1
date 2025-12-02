import { pointInRotatedRect } from "./hoverMath";

export function hitTestLayer(px, py, layers = []) {
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    const layer = layers[i];
    if (pointInRotatedRect(px, py, layer)) {
      return layer;
    }
  }
  return null;
}
