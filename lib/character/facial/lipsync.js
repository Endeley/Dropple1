const VISIME_MAP = {
  A: "open",
  E: "wide",
  F: "bite",
  O: "round",
  M: "closed",
  S: "teeth",
};

export function mapPhonemeToViseme(phoneme) {
  return VISIME_MAP[phoneme?.toUpperCase?.()] || "neutral";
}

export function generateLipSyncFromTranscript(transcript = []) {
  return transcript.map((word) => ({
    time: word.time || 0,
    viseme: mapPhonemeToViseme(word.phoneme || "neutral"),
  }));
}
