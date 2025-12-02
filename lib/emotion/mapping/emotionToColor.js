const COLOR_MAP = {
  Joy: ["#fbbf24", "#fde68a"],
  Sadness: ["#1e3a8a", "#0ea5e9"],
  Fear: ["#0ea5e9", "#0b0f1a"],
  Anger: ["#dc2626", "#7f1d1d"],
  Hope: ["#fde68a", "#22c55e"],
  Tension: ["#0b0b12", "#111827"],
  Love: ["#f472b6", "#fb7185"],
  Trust: ["#3b82f6", "#0ea5e9"],
  Surprise: ["#f59e0b", "#f97316"],
  Wonder: ["#8b5cf6", "#22d3ee"],
};

export function mapEmotionToColor(emotion = "Neutral") {
  return COLOR_MAP[emotion] || ["#ffffff", "#cccccc"];
}
