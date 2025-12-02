export function createCamera({ type = "perspective", fov = 50, aspect = 16 / 9, near = 0.1, far = 1000, position = [0, 0, 5], target = [0, 0, 0] }) {
  return {
    id: `cam_${Math.random().toString(36).slice(2, 8)}`,
    type,
    fov,
    aspect,
    near,
    far,
    position,
    target,
    ortho: { left: -1, right: 1, top: 1, bottom: -1 },
    dof: { enabled: false, focusDistance: 5, aperture: 0.025 },
  };
}
