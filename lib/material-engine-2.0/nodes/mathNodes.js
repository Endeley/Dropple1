export function mathNode(op = "add", inputs = []) {
  return { type: "math", op, inputs };
}
