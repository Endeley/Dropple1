export function generateTiming(lines = []) {
  return lines.map((line) => ({
    ...line,
    timing: {
      duration: line.pace === "slow" ? 3 : line.pace === "fast" ? 1.2 : 2,
      pauseAfter: line.tone === "dramatic" ? 0.4 : 0.2,
    },
  }));
}
