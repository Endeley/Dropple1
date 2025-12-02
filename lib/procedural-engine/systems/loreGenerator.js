export function generateLore(count = 3) {
  return Array.from({ length: count }).map((_, i) => ({ id: `lore_${i}`, text: "Lore entry" }));
}
