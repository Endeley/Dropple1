// Gaze tracking stub
export const computeGazeHit = (origin, direction, targets = []) => {
  // Very simplified: pick first target with a flag; real implementation would raycast.
  return targets.find((t) => t.isGazeTarget) || null;
};
