export function buildMultiTrackUI(tracks = []) {
  return { tracks: tracks.map((t) => t.name), status: "built" };
}
