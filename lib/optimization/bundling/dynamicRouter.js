export function selectBundle(mode = "design") {
  const mapping = {
    design: "/bundles/design.bundle.js",
    animation: "/bundles/animation.bundle.js",
    video: "/bundles/video.bundle.js",
    vfx: "/bundles/vfx.bundle.js",
    "3d": "/bundles/3d.bundle.js",
    ai: "/bundles/ai.bundle.js",
  };
  return mapping[mode] || mapping.design;
}
