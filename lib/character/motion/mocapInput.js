export function mapMocapFrame(frame) {
  // Placeholder for mocap frame mapping to rig pose.
  return {
    timestamp: frame?.timestamp || 0,
    joints: frame?.joints || [],
  };
}
