export function extractPhonemesFromLine(line = "") {
  // Placeholder phoneme extraction; real implementation would align to audio or TTS.
  const words = line.split(/\s+/).filter(Boolean);
  return words.map((w, i) => ({
    p: "AH",
    t: i * 0.2,
  }));
}
