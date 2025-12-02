export function generateBodyMotion({ intent = "idle", duration = 3 }) {
  return {
    intent,
    duration,
    keyframes: [
      { time: 0, pose: "idle" },
      { time: duration * 0.5, pose: intent },
      { time: duration, pose: "idle" },
    ],
  };
}
