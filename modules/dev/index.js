import DevInspector from "./DevInspector";
import DevCanvas from "./DevCanvas";
import { devTools } from "./tools";

export default {
  id: "dev",
  label: "Dev Mode",
  icon: "Code",
  tools: devTools,
  inspector: DevInspector,
  canvas: DevCanvas,
  timeline: null,
};
