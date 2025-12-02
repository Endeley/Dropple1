export function createEmotionState({ emotion = "Neutral", intensity = 0.5, colorBias = "neutral", motionBias = "smooth" }) {
  return {
    emotion,
    intensity,
    colorBias,
    motionBias,
  };
}
