export function generateExpressionTimeline({ emotion = "neutral", duration = 2 }) {
  return [
    { time: 0, emotion: "neutral" },
    { time: duration * 0.3, emotion },
    { time: duration * 0.8, emotion: "neutral" },
  ];
}
