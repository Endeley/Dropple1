export function suggestPacing(timeline) {
  return { suggestion: "slow intro, fast cut", tracks: timeline.tracks?.length || 0 };
}
