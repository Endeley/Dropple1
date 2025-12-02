export function applyMotionStyle(animation = {}, style = {}) {
  return { ...animation, motionStyle: style };
}
