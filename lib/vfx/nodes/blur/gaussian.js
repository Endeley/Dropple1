export function gaussianBlur(input, { radius = 8 } = {}) {
  return {
    type: "gaussianBlur",
    input,
    params: { radius },
  };
}
