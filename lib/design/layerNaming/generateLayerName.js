"use client";

const fallbackName = (type, text) => {
  if (type === "Text") {
    if (text && text.length > 30) return "Paragraph";
    if (text && text.length > 12) return "Subheading";
    return "Heading";
  }
  if (type === "Image") return "Image";
  if (type === "Rectangle") return "Rectangle";
  if (type === "Circle") return "Circle";
  if (type === "Triangle") return "Triangle";
  if (type === "Group") return "Group";
  return "Layer";
};

const sanitizeKeywords = (list = []) =>
  list
    .map((k) => (k == null ? "" : `${k}`.trim()))
    .filter(Boolean)
    .slice(0, 12);

export async function generateLayerName(features) {
  const keywords = sanitizeKeywords([
    features.type,
    features.text,
    features.fontSize ? `${features.fontSize}px` : null,
    features.fontWeight ? `w${features.fontWeight}` : null,
    features.primaryColor,
    features.width && features.height ? `${features.width}x${features.height}` : null,
    features.childCount ? `${features.childCount} children` : null,
  ]);

  try {
    const res = await fetch("/api/naming/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "Layer",
        tone: "Design",
        keywords,
        language: "English",
        count: 3,
      }),
    });
    const data = await res.json();
    const name = data?.results?.[0]?.name;
    if (name) return name;
  } catch (err) {
    console.error("generateLayerName failed", err);
  }

  return fallbackName(features.type, features.text);
}
