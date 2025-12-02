export function processAsset({ id, type = "image" }) {
  return {
    id,
    type,
    optimized: true,
    formats: ["webp"],
    preview: `cdn://previews/${id}.webp`,
  };
}
