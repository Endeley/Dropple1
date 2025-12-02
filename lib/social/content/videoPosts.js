export function createVideoPost(videoId, meta = {}) {
  return {
    type: "video",
    videoId,
    meta,
  };
}
