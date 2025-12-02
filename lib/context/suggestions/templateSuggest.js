const templateMap = {
  poster: ["Poster / Bold Gradient", "Poster / Minimal Grid"],
  video: ["Intro Sequence", "Lower Thirds Pack"],
  ui: ["Hero Header", "Pricing Grid", "CTA Bar"],
  brand: ["Brand Kit Starter", "Style Guide Outline"],
};

export function suggestTemplates(state = {}) {
  const mode = state.mode || "poster";
  return templateMap[mode] || ["Generic Template"];
}
