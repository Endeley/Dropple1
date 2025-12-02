// Minimal scene graph structure; to be expanded with full layer types.
export function toSceneGraph(layers = []) {
  return layers.map((layer) => ({
    id: layer.id,
    type: layer.type,
    props: layer.props || {},
    style: layer.style || {},
    children: layer.children ? toSceneGraph(layer.children) : [],
  }));
}
