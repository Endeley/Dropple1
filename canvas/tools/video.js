const log = (tool, phase) => () => console.debug(`[Video:${tool}] ${phase}`);

export const videoToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  cut: { onPointerDown: log("cut", "start") },
  trim: { onPointerDown: log("trim", "start"), onPointerMove: log("trim", "drag"), onPointerUp: log("trim", "end") },
  text: { onPointerDown: log("text", "add") },
  transition: { onPointerDown: log("transition", "add") },
  keyframe: { onPointerDown: log("keyframe", "toggle") },
  "ai-broll": { onPointerDown: log("ai-broll", "invoke") },
};
