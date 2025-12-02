export function extractHashtags(text = "") {
  const matches = text.match(/#(\\w+)/g) || [];
  return matches.map((m) => m.slice(1));
}
