import { LayerType } from "@/canvas/core/layerTypes";
import { registerInspector } from "./inspectorRegistry";
import TextInspector from "./sections/TextInspector";

export function registerDefaultInspectors() {
  registerInspector(LayerType.TEXT, TextInspector);
}
