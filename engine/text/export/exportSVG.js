/**
 * Export lines/words to an SVG string. Matrices are applied per word.
 */
export function exportSVG(lines, textProps) {
  const { fontFamily, fontSize, color } = textProps;
  const svgParts = [];
  svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg">`);

  for (const line of lines) {
    for (const word of line.words) {
      const [a, b, c, d, e, f] = word.matrix || [1, 0, 0, 1, 0, 0];
      const transform = `matrix(${a} ${b} ${c} ${d} ${e + word.x} ${f + word.y})`;
      svgParts.push(
        `<text transform="${transform}" font-family="${word.fontFamily || fontFamily}" font-size="${word.fontSize || fontSize}px" fill="${word.color || color}">${escapeSvg(
          word.value
        )}</text>`
      );
    }
  }

  svgParts.push(`</svg>`);
  return svgParts.join("\n");
}

function escapeSvg(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
