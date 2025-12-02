export function createScene3D() {
  return {
    id: `scene_${Math.random().toString(36).slice(2, 8)}`,
    objects: [],
    lights: [],
    camera: null,
    environment: {},
  };
}

export function addObject(scene, object) {
  return { ...scene, objects: [...scene.objects, object] };
}

export function addLight(scene, light) {
  return { ...scene, lights: [...scene.lights, light] };
}

export function setCamera(scene, camera) {
  return { ...scene, camera };
}
