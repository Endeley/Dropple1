export function glitch(input, { intensity = 0.4, chroma = 0.2 } = {}) {
  return {
    type: "glitch",
    input,
    params: { intensity, chroma },
  };
}
