export function isWordSelected(word, selectedWords) {
  return selectedWords.includes(word);
}

export function isWordHovered(word, hoveredWord) {
  return hoveredWord === word;
}
