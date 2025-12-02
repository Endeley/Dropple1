const log = (tool, phase) => () => console.debug(`[AIStudio:${tool}] ${phase}`);

export const aiToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  generate: { onPointerDown: log("generate", "invoke") },
  inpaint: { onPointerDown: log("inpaint", "start"), onPointerMove: log("inpaint", "paint"), onPointerUp: log("inpaint", "end") },
  outpaint: { onPointerDown: log("outpaint", "drag") },
  variations: { onPointerDown: log("variations", "open") },
  refine: { onPointerDown: log("refine", "apply") },
};
