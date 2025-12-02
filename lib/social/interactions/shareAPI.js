export function createShareLink(postId, visibility = "public") {
  return {
    url: `https://dropple.share/${postId}`,
    visibility,
  };
}
