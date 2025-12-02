const defaultCursor = "default";

const cursorMapConfig = {
  select: "default",
  move: "move",
  text: "text",
  brush: "crosshair",
  erase: "cell",
  pen: "crosshair",
  trim: "ew-resize",
  cut: "crosshair",
};

export default function cursorMap(mode, tool) {
  return cursorMapConfig[tool] || defaultCursor;
}
