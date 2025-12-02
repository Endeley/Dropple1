export function drawCurveGraph(track) {
  return { curve: track.curve || "linear", points: track.keyframes?.length || 0 };
}
