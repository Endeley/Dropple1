export function createRenderPass({ id, type, params = {} }) {
  return {
    id: id || `pass_${Math.random().toString(36).slice(2, 8)}`,
    type,
    params,
  };
}
