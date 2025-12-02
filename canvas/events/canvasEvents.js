export function emitCanvasEvent(type, detail) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
