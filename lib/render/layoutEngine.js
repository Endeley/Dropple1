export function layoutEngine(data = {}) {
  const size = data.size || "1:1";
  const preset =
    {
      "1:1": { width: 1080, height: 1080 },
      "9:16": { width: 1080, height: 1920 },
      "16:9": { width: 1920, height: 1080 },
      "4:5": { width: 1080, height: 1350 },
    }[size] || { width: 1080, height: 1080 };

  const blocks = Array.isArray(data?.layout?.blocks) ? data.layout.blocks : [];

  return {
    width: data.width || preset.width,
    height: data.height || preset.height,
    grid: data?.layout?.grid || "12-col",
    blocks,
    meta: {
      variant: data.variant || "default",
      theme: data.theme || "light",
    },
  };
}
