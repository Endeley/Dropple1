export const Dirty = {
  NONE: 0,
  TEXT: 1, // text changed -> tokenize again
  TOKENS: 2, // tokens changed -> remeasure
  BOXES: 4, // word boxes changed
  LAYOUT: 8, // layout changed
  TRANSFORMS: 16, // transforms changed
  ANIMATION: 32, // animation keyframes changed
};
