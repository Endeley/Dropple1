// Universe-level interaction stubs
export const universeInteractions = {
  onTimelineEvent(event, context) {
    context?.onTimelineEvent?.(event);
  },
  onLoreUnlock(node, context) {
    context?.onLoreUnlock?.(node);
  },
};
