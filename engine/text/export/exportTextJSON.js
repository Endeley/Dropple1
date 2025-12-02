import { exportWordJSON } from "./exportWordJSON.js";

/**
 * Export the entire text block (lines + props) to JSON.
 */
export function exportTextJSON(lines, textProps) {
  return {
    type: "text",
    props: {
      maxWidth: textProps.maxWidth,
      align: textProps.align,
      lineHeight: textProps.lineHeight,
      fontFamily: textProps.fontFamily,
      fontSize: textProps.fontSize,
      color: textProps.color,
      weight: textProps.weight,
    },
    lines: lines.map((line) => ({
      y: line.y,
      height: line.height,
      words: line.words.map((w) => exportWordJSON(w)),
    })),
  };
}
