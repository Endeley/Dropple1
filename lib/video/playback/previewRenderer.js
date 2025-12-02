import { selectRenderer } from "@/lib/render/rendererSelector";
import { toSceneGraph } from "@/lib/render/sceneGraph";

export function renderPreview({ layers = [], width = 1920, height = 1080, target = "preview" }) {
  const renderer = selectRenderer(target);
  const scene = toSceneGraph(layers);
  return renderer({ scene, width, height });
}
