import DesignCanvas from "./DesignCanvas";
import DesignInspector from "./DesignInspector";
import { designTools } from "./tools";

export default {
  id: "design",
  label: "Design",
  icon: "Brush",
  tools: designTools,
  inspector: DesignInspector,
  canvas: DesignCanvas,
  timeline: null,
};
