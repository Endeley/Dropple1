export async function encodeVideo({ frames = [], width = 1920, height = 1080, fps = 30, format = "mp4" }) {
  // Placeholder for WebCodecs/ffmpeg encoding.
  return {
    ok: false,
    note: "Video encoding pipeline not yet implemented in this stub.",
    frames: frames.length,
    width,
    height,
    fps,
    format,
  };
}
