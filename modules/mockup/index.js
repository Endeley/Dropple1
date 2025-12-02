import AICanvas from "../ai-studio/AICanvas";
import MockupInspector from "./MockupInspector";
import { mockupTools } from "./tools";

export default {
  id: "mockup",
  label: "Mockups",
  icon: "Box",
  tools: mockupTools,
  inspector: MockupInspector,
  canvas: AICanvas,
  timeline: null,
};
