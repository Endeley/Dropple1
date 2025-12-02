export function generateDialogue(count = 3) {
  return Array.from({ length: count }).map((_, i) => `Line ${i + 1}`);
}
