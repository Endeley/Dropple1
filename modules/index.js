import design from "./design";
import aiStudio from "./ai-studio";
import mockup from "./mockup";
import video from "./video";
import audio from "./audio";
import template from "./template";
import dev from "./dev";
import smart from "./smart-edit";

export const modes = [
  design,
  aiStudio,
  mockup,
  video,
  audio,
  template,
  dev,
  smart,
];

export function getMode(id) {
  return modes.find((m) => m.id === id) || modes[0];
}
