export function createAudioTrack(name = "Audio") {
  return { type: "audio", name, clips: [] };
}
