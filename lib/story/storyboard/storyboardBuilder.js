export function buildStoryboard(scenes = []) {
  return scenes.map((scene, i) => ({
    sceneId: scene.id,
    panels: [
      {
        shotType: "Wide",
        camera: { angle: "eye", movement: scene.camera?.move || "static" },
        composition: "rule of thirds",
        lighting: scene.lighting || "soft",
        duration: scene.duration || 5,
      },
      {
        shotType: "Medium",
        camera: { angle: "30°", movement: "dolly-in" },
        composition: "centered",
        lighting: scene.lighting || "soft",
        duration: 3,
      },
    ],
  }));
}
