export function chromaKey(input, { keyColor = [0, 1, 0], tolerance = 0.1 } = {}) {
  return {
    type: "chromaKey",
    input,
    params: { keyColor, tolerance },
  };
}
