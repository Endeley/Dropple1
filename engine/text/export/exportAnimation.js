/**
 * Export animation timeline tracks to JSON-friendly format.
 * Expects timeline.tracks as Map<word, Keyframe[]>
 */
export function exportAnimation(timeline) {
  const result = {};
  for (const [word, track] of timeline.tracks.entries()) {
    result[word.value] = track.map((kf) => ({
      time: kf.time,
      props: kf.props,
      easing: kf.easing,
    }));
  }
  return result;
}
