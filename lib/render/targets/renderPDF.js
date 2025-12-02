export function renderPDF({ scene, width, height }) {
  return {
    type: "pdf",
    width,
    height,
    nodes: scene,
    note: "PDF render placeholder",
  };
}
