const timelines = [];

export function createTimeline(name = "Timeline 2.0") {
  const tl = { id: `tl_${Math.random().toString(36).slice(2, 8)}`, name, tracks: [] };
  timelines.push(tl);
  return tl;
}

export function listTimelines() {
  return timelines;
}
