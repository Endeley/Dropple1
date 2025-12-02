/**
 * Hit-test lines to find which word is under (x,y).
 * Coords are relative to the text block origin.
 */
export function hitTestWord(lines, x, y) {
  for (const line of lines) {
    const top = line.y;
    const bottom = line.y + line.height;
    if (y < top || y > bottom) continue;

    // Mouse is vertically inside this line
    for (const word of line.words) {
      const left = word.x;
      const right = word.x + word.width + (word.extraSpacing || 0);
      if (x >= left && x <= right) {
        return { word, line };
      }
    }
  }
  return null;
}
