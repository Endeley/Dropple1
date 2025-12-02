import { templateCategoryMap } from "./templateCategoryMap";

const pickTone = ({ typography, colors = [] }) => {
  if (typography?.style === "serif") return "Elegant";
  if (typography?.weight === "bold") return "Bold";
  if (colors.includes("#000") || colors.includes("#111")) return "Minimal";
  if ((colors || []).some((c) => `${c}`.toLowerCase().includes("ff00"))) return "Futuristic";
  return "Modern";
};

const topColors = (colors = []) => (Array.isArray(colors) ? colors.slice(0, 3) : []);

export function deriveTemplateMetadata(template = {}) {
  const colors = topColors(template.colors || template.palette || []);
  const category = template.category || template.type || "";
  const tags = Array.isArray(template.tags) ? template.tags : [];
  const typography = template.typography || template.style || {};

  const tone = template.tone || pickTone({ typography, colors });

  const categoryKeywords = templateCategoryMap[category?.toLowerCase?.() || ""] || templateCategoryMap.default;

  const keywords = [
    ...colors,
    category,
    ...(tags || []),
    typography?.style,
    typography?.weight,
    ...(categoryKeywords || []),
  ]
    .filter(Boolean)
    .map((k) => `${k}`.trim());

  return {
    tone,
    keywords,
    language: "English",
  };
}
