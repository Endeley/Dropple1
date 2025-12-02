/**
 * Compute height/baseline per line based on asc/desc and a multiplier.
 */
export function computeLineMetrics(lines, lineHeightMultiplier = 1.2) {
  for (const line of lines) {
    const asc = line.asc;
    const desc = line.desc;
    line.baseline = asc;
    line.height = (asc + desc) * lineHeightMultiplier;
  }
}
