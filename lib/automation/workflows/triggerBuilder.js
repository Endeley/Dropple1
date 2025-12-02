const triggers = [];

export function registerTrigger(event, handler) {
  triggers.push({ event, handler });
  return () => {
    const i = triggers.findIndex((t) => t.handler === handler && t.event === event);
    if (i >= 0) triggers.splice(i, 1);
  };
}

export function fireTrigger(event, payload) {
  triggers.filter((t) => t.event === event).forEach((t) => {
    try {
      t.handler(payload);
    } catch (err) {
      console.error("Automation trigger error", err);
    }
  });
}
