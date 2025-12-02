const FILLERS = ["um", "uh", "like", "you know", "uhh", "umm"];

export function removeFillerWords(transcript) {
  if (!transcript?.words) return transcript;
  const filtered = transcript.words.filter((w) => !FILLERS.includes(w.text?.toLowerCase?.()));
  return { ...transcript, words: filtered };
}
