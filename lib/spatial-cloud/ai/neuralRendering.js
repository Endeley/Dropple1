export function neuralRender(scene = {}) {
  return { sceneSize: Object.keys(scene).length, status: "queued" };
}
