const LIGHTING_MAP = {
  Joy: { key: 1.0, fill: 0.6, temperature: 5600, contrast: 0.2 },
  Sadness: { key: 0.5, fill: 0.3, temperature: 4200, contrast: 0.4 },
  Fear: { key: 0.6, fill: 0.2, temperature: 4800, contrast: 0.6 },
  Anger: { key: 0.9, fill: 0.2, temperature: 6200, contrast: 0.7 },
  Hope: { key: 0.8, fill: 0.5, temperature: 5200, contrast: 0.3 },
  Tension: { key: 0.5, fill: 0.1, temperature: 5000, contrast: 0.8 },
  Love: { key: 0.9, fill: 0.6, temperature: 5400, contrast: 0.2, bloom: 0.4 },
  Trust: { key: 0.8, fill: 0.5, temperature: 5200, contrast: 0.25 },
  Surprise: { key: 1.0, fill: 0.5, temperature: 5600, contrast: 0.35 },
  Wonder: { key: 0.8, fill: 0.4, temperature: 6000, contrast: 0.3, fog: 0.2 },
};

export function mapEmotionToLighting(emotion = "Neutral") {
  return LIGHTING_MAP[emotion] || { key: 0.7, fill: 0.4, temperature: 5200, contrast: 0.3 };
}
