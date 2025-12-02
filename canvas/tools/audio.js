const log = (tool, phase) => () => console.debug(`[Audio:${tool}] ${phase}`);

export const audioToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  trim: { onPointerDown: log("trim", "start"), onPointerMove: log("trim", "drag"), onPointerUp: log("trim", "end") },
  split: { onPointerDown: log("split", "execute") },
  fade: { onPointerDown: log("fade", "adjust") },
  clean: { onPointerDown: log("clean", "apply") },
  voiceover: { onPointerDown: log("voiceover", "start") },
};
