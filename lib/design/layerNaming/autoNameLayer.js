"use client";

import { detectLayerType } from "./detectLayerType";
import { extractLayerFeatures } from "./extractLayerFeatures";
import { generateLayerName } from "./generateLayerName";
import { useTemplateStore } from "@/stores/useTemplateStore";

const buildSignature = (type, features) => {
  return [
    type,
    features.width,
    features.height,
    features.fontSize,
    features.fontWeight,
    features.primaryColor,
    features.text,
    features.childCount,
  ]
    .map((v) => (v == null ? "" : `${v}`))
    .join("|");
};

export async function autoNameLayer(canvas, obj) {
  if (!obj) return "Layer";

  try {
    const type = detectLayerType(obj);
    const features = extractLayerFeatures(obj);
    const signature = buildSignature(type, features);

    if (obj._autoNameSignature === signature && obj.name) {
      return obj.name;
    }

    const name = await generateLayerName({ ...features, type });
    obj.name = name;
    obj.layerName = name;
    obj._autoNameSignature = signature;

    if (canvas?.requestRenderAll) canvas.requestRenderAll();
    useTemplateStore.getState().updateLayers?.();

    return name;
  } catch (err) {
    console.error("Layer Naming Error:", err);
    return obj?.name || "Layer";
  }
}
