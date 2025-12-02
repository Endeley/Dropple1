export function createTimeline() {
  return {
    events: [],
  };
}

export function addTimelineEvent(timeline, evt) {
  return { ...timeline, events: [...timeline.events, evt].sort((a, b) => (a.time || 0) - (b.time || 0)) };
}
