import AIStudioInspector from "./AIStudioInspector";
import AICanvas from "./AICanvas";
import { aiStudioTools } from "./tools";

export default {
  id: "ai",
  label: "AI Studio",
  icon: "Sparkles",
  tools: aiStudioTools,
  inspector: AIStudioInspector,
  canvas: AICanvas,
  timeline: null,
};
