const noop = () => {};

function log(tool, action) {
  return (e) => {
    console.debug(`[DesignTool:${tool}] ${action}`, { x: e?.clientX, y: e?.clientY });
  };
}

export const designToolBehaviors = {
  select: {
    onPointerDown: log("select", "down"),
    onPointerMove: log("select", "move"),
    onPointerUp: log("select", "up"),
  },
  move: {
    onPointerDown: log("move", "down"),
    onPointerMove: log("move", "move"),
    onPointerUp: log("move", "up"),
  },
  text: { onPointerDown: log("text", "down"), onPointerMove: noop, onPointerUp: noop },
  shape: { onPointerDown: log("shape", "down"), onPointerMove: noop, onPointerUp: noop },
  image: { onPointerDown: log("image", "down"), onPointerMove: noop, onPointerUp: noop },
  pen: { onPointerDown: log("pen", "down"), onPointerMove: log("pen", "draw"), onPointerUp: noop },
  "ai-generate": { onPointerDown: log("ai-generate", "open"), onPointerMove: noop, onPointerUp: noop },
};
