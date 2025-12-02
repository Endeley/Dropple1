const log = (tool, phase) => () => console.debug(`[Mockup:${tool}] ${phase}`);

export const mockupToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  replace: { onPointerDown: log("replace", "open") },
  perspective: { onPointerDown: log("perspective", "start"), onPointerMove: log("perspective", "drag"), onPointerUp: log("perspective", "end") },
  lighting: { onPointerDown: log("lighting", "adjust") },
  material: { onPointerDown: log("material", "adjust") },
  "ai-mockup": { onPointerDown: log("ai-mockup", "run") },
};
