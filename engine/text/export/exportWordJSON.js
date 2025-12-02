export function exportWordJSON(word) {
  return {
    type: word.type,
    value: word.value,
    x: word.x,
    y: word.y,
    width: word.width,
    height: word.height,
    asc: word.asc,
    desc: word.desc,
    matrix: word.matrix || [1, 0, 0, 1, 0, 0],
    style: {
      fontSize: word.fontSize,
      fontFamily: word.fontFamily,
      color: word.color,
      weight: word.weight,
      letterSpacing: word.letterSpacing,
    },
    animation: word.animation || null,
    tokens: word.tokens,
  };
}
