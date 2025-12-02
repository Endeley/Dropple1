export function renderToCanvas(canvas) {
  // In a future GPU/canvas implementation, this would draw pixels.
  // Here we pass through the structured render plan.
  return {
    ...canvas,
    rendered: true,
  };
}
