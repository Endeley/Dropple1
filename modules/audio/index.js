import AudioCanvas from "./AudioCanvas";
import AudioInspector from "./AudioInspector";
import { audioTools } from "./tools";

export default {
  id: "audio",
  label: "Audio",
  icon: "Waveform",
  tools: audioTools,
  inspector: AudioInspector,
  canvas: AudioCanvas,
  timeline: true,
};
