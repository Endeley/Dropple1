export function createVideoTrack(name = "Video") {
  return { type: "video", name, clips: [] };
}
