const log = (tool, action) => () => console.debug(`[Template:${tool}] ${action}`);

export const templateToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  text: { onPointerDown: log("text", "insert") },
  shape: { onPointerDown: log("shape", "insert") },
  image: { onPointerDown: log("image", "insert") },
  "auto-layout": { onPointerDown: log("auto-layout", "run") },
  "refine-template": { onPointerDown: log("refine", "run") },
};
