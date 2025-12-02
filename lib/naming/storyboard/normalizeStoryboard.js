export function normalizeStoryboard(data = {}) {
  return {
    scenes: Array.isArray(data.scenes) ? data.scenes : [],
    style_guide: data.style_guide || {
      palette: [],
      line_style: "",
      composition: "",
      motion: "",
    },
  };
}
