export function createBehaviorTree(root) {
  return { root };
}

export function tickBehaviorTree(tree, context) {
  // Placeholder: evaluate root node.
  if (typeof tree.root === "function") {
    return tree.root(context);
  }
  return null;
}
