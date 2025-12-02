export function definePersonality({ name, traits = [], speechStyle = "", emotionBias = "neutral" }) {
  return {
    name,
    traits,
    speechStyle,
    emotionBias,
  };
}
