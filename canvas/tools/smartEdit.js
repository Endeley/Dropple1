const log = (tool, phase) => (e) => {
  console.debug(`[SmartEdit:${tool}] ${phase}`, { x: e?.clientX, y: e?.clientY });
};

export const smartEditToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  brush: { onPointerDown: log("brush", "down"), onPointerMove: log("brush", "paint"), onPointerUp: log("brush", "up") },
  erase: { onPointerDown: log("erase", "down"), onPointerMove: log("erase", "paint"), onPointerUp: log("erase", "up") },
  lasso: { onPointerDown: log("lasso", "start"), onPointerMove: log("lasso", "drag"), onPointerUp: log("lasso", "end") },
  mask: { onPointerDown: log("mask", "toggle") },
  "remove-bg": { onPointerDown: log("remove-bg", "exec") },
  "smart-fill": { onPointerDown: log("smart-fill", "exec") },
};
