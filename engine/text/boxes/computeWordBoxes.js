import { WORD_TYPES } from "../tokenizer/WORD_TYPES.js";
import { measureChar } from "./measureText.js";

/**
 * Compute bounding boxes for tokens. Each box carries geometry
 * (width/height/asc/desc) and references back to its token(s).
 *
 * @param {Array} tokens - tokens from tokenizeWords
 * @param {string} font - font string (e.g., "16px Inter"). Optional; set via setFont elsewhere.
 * @returns {Array} boxes
 */
export function computeWordBoxes(tokens) {
  const boxes = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const box = computeTokenBox(token);
    boxes.push(box);
  }

  return boxes;
}

function computeTokenBox(token) {
  const chars = [...token.value];
  let width = 0;
  let asc = 0;
  let desc = 0;

  for (const c of chars) {
    const metrics = measureChar(c);
    width += metrics.width;
    asc = Math.max(asc, metrics.asc);
    desc = Math.max(desc, metrics.desc);
  }

  // Whitespace carries width but zero height for layout convenience.
  const isSpace = token.type === WORD_TYPES.WHITESPACE;

  return {
    type: token.type,
    value: token.value,
    tokens: [token],
    width,
    asc: isSpace ? 0 : asc,
    desc: isSpace ? 0 : desc,
    height: isSpace ? 0 : asc + desc,
  };
}
