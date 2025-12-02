export function blendNode(a, b, mode = "mix") {
  return { type: "blend", inputs: [a, b], mode };
}
