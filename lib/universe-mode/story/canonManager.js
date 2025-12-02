export function markCanon(node, canon = true) {
  return { ...node, canon };
}
