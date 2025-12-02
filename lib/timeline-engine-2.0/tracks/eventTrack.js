export function createEventTrack(name = "Events") {
  return { type: "event", name, events: [] };
}
