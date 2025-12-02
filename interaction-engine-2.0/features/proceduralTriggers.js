// Procedural triggers scaffold
export const createProceduralTrigger = (condition, action) => ({
  condition,
  action,
});

export const runProceduralTriggers = (triggers = [], context = {}) => {
  triggers.forEach((t) => {
    if (typeof t.condition === "function" && t.condition(context)) {
      t.action?.(context);
    }
  });
};
