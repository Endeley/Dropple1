export function createStoryPost(storyId, meta = {}) {
  return {
    type: "story",
    storyId,
    meta,
  };
}
