import AICanvas from "../ai-studio/AICanvas";
import SmartEditInspector from "./SmartEditInspector";
import { smartEditTools } from "./tools";

export default {
  id: "smart",
  label: "Smart Edit",
  icon: "Magic",
  tools: smartEditTools,
  inspector: SmartEditInspector,
  canvas: AICanvas,
  timeline: null,
};
