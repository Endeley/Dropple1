export function extractMotionProfile(curves = []) {
  return { curves, defaultCurve: curves[0] || "easeInOut" };
}
