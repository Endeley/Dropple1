import VideoCanvas from "./VideoCanvas";
import VideoInspector from "./VideoInspector";
import { videoTools } from "./tools";

export default {
  id: "video",
  label: "Video",
  icon: "Clapperboard",
  tools: videoTools,
  inspector: VideoInspector,
  canvas: VideoCanvas,
  timeline: true,
};
