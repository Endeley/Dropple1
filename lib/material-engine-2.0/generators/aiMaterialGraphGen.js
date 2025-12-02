export function generateMaterialGraph(prompt = "material") {
  return { prompt, nodes: [{ type: "noise" }, { type: "blend" }] };
}
