export function buildTypographyProfile(fonts = []) {
  return { fonts, primary: fonts[0] || "Inter" };
}
