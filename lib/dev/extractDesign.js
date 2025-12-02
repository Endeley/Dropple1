import { useLayersStore } from "@/stores/useLayersStore";

export default function extractDesign() {
  const layers = useLayersStore.getState()?.layers || [];
  return layers.map((layer) => ({
    id: layer.id,
    type: layer.type,
    text: layer.text,
    width: layer.width,
    height: layer.height,
    x: layer.x,
    y: layer.y,
    fill: layer.fill,
    fontSize: layer.fontSize,
    fontWeight: layer.fontWeight,
    radius: layer.radius,
  }));
}
