export function optimizeMedia({ type = "image", src }) {
  if (type === "image") {
    return { format: "webp", src, optimized: true };
  }
  if (type === "video") {
    return { format: "mp4", src, optimized: true };
  }
  return { format: "raw", src, optimized: false };
}
