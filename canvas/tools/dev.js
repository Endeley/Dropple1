const log = (tool, phase) => () => console.debug(`[Dev:${tool}] ${phase}`);

export const devToolBehaviors = {
  select: { onPointerDown: log("select", "down") },
  inspect: { onPointerDown: log("inspect", "open") },
  html: { onPointerDown: log("html", "preview") },
  tailwind: { onPointerDown: log("tailwind", "copy") },
  component: { onPointerDown: log("component", "create") },
  "ai-dev": { onPointerDown: log("ai-dev", "invoke") },
};
