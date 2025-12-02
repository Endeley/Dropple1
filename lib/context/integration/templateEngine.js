export function mapContextToTemplate(mode = "poster") {
  if (mode === "video") return "Video Intro Pack";
  if (mode === "ui") return "UI Hero Section";
  if (mode === "brand") return "Brand Guidelines Sheet";
  return "Poster Starter";
}
