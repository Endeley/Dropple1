const scenes = new Map();

export function addSceneHistory(sceneId, entry) {
  if (!scenes.has(sceneId)) scenes.set(sceneId, []);
  scenes.get(sceneId).push({ entry, ts: Date.now() });
}

export function getSceneHistory(sceneId) {
  return scenes.get(sceneId) || [];
}
