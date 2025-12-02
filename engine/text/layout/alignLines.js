/**
 * Apply horizontal alignment offsets to each line.
 */
export function applyAlignment(lines, maxWidth, align = "left") {
  for (const line of lines) {
    const free = maxWidth != null ? maxWidth - line.width : 0;

    switch (align) {
      case "center":
        line.xOffset = free / 2;
        break;

      case "right":
        line.xOffset = free;
        break;

      case "justify":
        if (line.words.length <= 1 || free <= 0) {
          line.xOffset = 0;
          break;
        }
        const gaps = line.words.length - 1;
        const extra = free / gaps;
        for (let i = 1; i < line.words.length; i++) {
          line.words[i].extraSpacing = extra;
        }
        line.xOffset = 0;
        break;

      default:
      case "left":
        line.xOffset = 0;
        break;
    }
  }
}
