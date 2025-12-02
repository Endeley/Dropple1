import { LayerType } from "../core/layerTypes";
import { renderShape } from "./types/renderShape";
import { renderText } from "./types/renderText";
import { renderImage } from "./types/renderImage";
import { renderFrame } from "./types/renderFrame";
import { renderComponentInstance } from "./types/renderComponentInstance";
import { renderTemplateInstance } from "./types/renderTemplateInstance";
import { renderSlot } from "./renderSlot";

export function renderLayer(ctx, layer) {
  switch (layer.type) {
    case LayerType.SHAPE:
      renderShape(ctx, layer);
      break;
    case LayerType.TEXT:
      renderText(ctx, layer);
      break;
    case LayerType.IMAGE:
      renderImage(ctx, layer);
      break;
    case LayerType.FRAME:
      renderFrame(ctx, layer);
      break;
    case LayerType.COMPONENT_INSTANCE:
      renderComponentInstance(ctx, layer);
      break;
    case LayerType.TEMPLATE_INSTANCE:
      renderTemplateInstance(ctx, layer);
      break;
    case "slot":
      renderSlot(ctx, layer);
      break;
    default:
      break;
  }
}
