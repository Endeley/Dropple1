export function glow(input, { intensity = 1, threshold = 0.6 } = {}) {
  return {
    type: "glow",
    input,
    params: { intensity, threshold },
  };
}
