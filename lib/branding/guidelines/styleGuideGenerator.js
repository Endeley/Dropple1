export function generateStyleGuide(kit) {
  return {
    brand: kit.name,
    sections: [
      "Brand Foundations",
      "Logo System",
      "Colors",
      "Typography",
      "Imagery",
      "Layout",
      "Motion",
      "Templates",
    ],
    palette: kit.palette,
    typography: kit.typography,
    logos: kit.logos,
  };
}
