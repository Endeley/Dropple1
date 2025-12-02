import { WORD_TYPES } from "./WORD_TYPES.js";

// Unicode-aware character tests
const LETTER_NUMBER = /\p{L}|\p{N}/u;
const EMOJI = /\p{Extended_Pictographic}/u;
const WHITESPACE = /\s/;
const PUNCT = /[.,!?;:()\[\]{}…]/;

export function tokenizeWords(text) {
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    // Emoji
    if (EMOJI.test(char)) {
      tokens.push({
        type: WORD_TYPES.EMOJI,
        value: char,
        start: i,
        end: i + 1,
        chars: [char],
      });
      i++;
      continue;
    }

    // Whitespace (space, tab, newline, etc.)
    if (WHITESPACE.test(char)) {
      let start = i;
      let value = char;
      i++;

      while (i < text.length && WHITESPACE.test(text[i])) {
        value += text[i];
        i++;
      }

      tokens.push({
        type: WORD_TYPES.WHITESPACE,
        value,
        start,
        end: i,
        chars: [...value],
      });
      continue;
    }

    // Punctuation
    if (PUNCT.test(char)) {
      tokens.push({
        type: WORD_TYPES.PUNCTUATION,
        value: char,
        start: i,
        end: i + 1,
        chars: [char],
      });
      i++;
      continue;
    }

    // Words (letters and numbers)
    if (LETTER_NUMBER.test(char)) {
      let start = i;
      let value = char;
      i++;

      while (i < text.length && LETTER_NUMBER.test(text[i])) {
        value += text[i];
        i++;
      }

      tokens.push({
        type: WORD_TYPES.WORD,
        value,
        start,
        end: i,
        chars: [...value],
      });
      continue;
    }

    // Symbol fallback
    tokens.push({
      type: WORD_TYPES.SYMBOL,
      value: char,
      start: i,
      end: i + 1,
      chars: [char],
    });
    i++;
  }

  return { tokens, text };
}
