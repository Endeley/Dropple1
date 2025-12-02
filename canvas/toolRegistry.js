import { designToolBehaviors } from "./tools/design";
import { smartEditToolBehaviors } from "./tools/smartEdit";
import { templateToolBehaviors } from "./tools/template";
import { videoToolBehaviors } from "./tools/video";
import { audioToolBehaviors } from "./tools/audio";
import { aiToolBehaviors } from "./tools/aiStudio";
import { mockupToolBehaviors } from "./tools/mockup";
import { devToolBehaviors } from "./tools/dev";

const modeBehaviors = {
  design: designToolBehaviors,
  "smart": smartEditToolBehaviors,
  "smart-edit": smartEditToolBehaviors,
  template: templateToolBehaviors,
  video: videoToolBehaviors,
  audio: audioToolBehaviors,
  ai: aiToolBehaviors,
  "ai-studio": aiToolBehaviors,
  mockup: mockupToolBehaviors,
  dev: devToolBehaviors,
};

export default function toolRegistry(mode, toolId) {
  const behaviors = modeBehaviors[mode] || {};
  return behaviors[toolId] || null;
}
