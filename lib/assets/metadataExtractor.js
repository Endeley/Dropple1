import { detectType } from "./detector";

export function extractMetadata({ fileName, mime, size, width, height }) {
  const type = detectType(fileName, mime);
  const dominantColor = "#8B5CF6"; // placeholder
  const palette = ["#8B5CF6", "#0b0b12", "#22d3ee"];

  return {
    type,
    size,
    width,
    height,
    dominantColor,
    palette,
    dpi: 72,
    subject: "unknown",
    description: "",
    tags: [],
  };
}
