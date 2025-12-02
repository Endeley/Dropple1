export function extractColorProfile(palette = []) {
  return { palette, dominant: palette[0] || null };
}
