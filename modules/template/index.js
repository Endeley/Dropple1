import TemplatePreview from "@/components/ai/template/TemplatePreview";
import TemplateInspector from "./TemplateInspector";
import { templateTools } from "./tools";

export default {
  id: "template",
  label: "Templates",
  icon: "Layers",
  tools: templateTools,
  inspector: TemplateInspector,
  canvas: TemplatePreview,
  timeline: null,
};
