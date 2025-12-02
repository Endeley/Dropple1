"use client";

let measureContext = null;

function getMeasureContext() {
  if (typeof document === "undefined") return null;
  if (measureContext) return measureContext;
  const canvas = document.createElement("canvas");
  measureContext = canvas.getContext("2d");
  return measureContext;
}

export function computeTextLayout(content = {}) {
  const text = typeof content.text === "string" ? content.text : "";
  const fontSize = Math.max(1, content.fontSize ?? content.textSize ?? 16);
  const fontFamily = content.fontFamily || "Inter, sans-serif";
  const fontWeight = content.fontWeight || 400;
  const lineHeight = content.lineHeight ?? 1.2;
  const letterSpacing = content.letterSpacing ?? 0;
  const color = content.color || content.textColor || "#111827";

  if (!text) {
    return { characters: [], words: [] };
  }

  const ctx = getMeasureContext();
  if (ctx) {
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  }

  const characters = [];
  const lines = text.split("\n");
  const lineHeightPx = fontSize * lineHeight;
  let cursorY = 0;

  lines.forEach((line, lineIndex) => {
    let cursorX = 0;
    const chars = line.split("");
    chars.forEach((char, index) => {
      const width = measureWidth(ctx, char, fontSize);
      const charHeight = fontSize;
      const baseline = cursorY + charHeight;
      characters.push({
        char,
        x: cursorX,
        y: baseline,
        width,
        height: charHeight,
        baseline,
        fontWeight,
        opacity: 1,
        scale: 1,
        color,
        index: characters.length,
      });
      cursorX += width + letterSpacing;
    });

    // Preserve newline character as zero-size entry for interpolation consistency
    if (lineIndex < lines.length - 1) {
      characters.push({
        char: "\n",
        x: cursorX,
        y: cursorY + fontSize,
        width: 0,
        height: fontSize,
        baseline: cursorY + fontSize,
        fontWeight,
        opacity: 0,
        scale: 1,
        color,
        index: characters.length,
      });
    }

    cursorY += lineHeightPx;
  });

  return {
    characters,
    words: groupWords(characters),
  };
}

function measureWidth(ctx, char, fontSize) {
  if (!ctx) {
    const factor = char === " " ? 0.4 : 0.6;
    return fontSize * factor;
  }
  const metrics = ctx.measureText(char);
  return metrics.width || fontSize * 0.5;
}

function groupWords(characters = []) {
  const words = [];
  let current = [];

  const flush = () => {
    if (!current.length) return;
    words.push(makeWord(current));
    current = [];
  };

  characters.forEach((character) => {
    if (isWordBoundary(character?.char)) {
      flush();
      return;
    }
    current.push({ ...character });
  });

  flush();
  return words;
}

function isWordBoundary(char) {
  if (char === undefined || char === null) return true;
  return /\s/.test(char);
}

function makeWord(chars) {
  const minX = Math.min(...chars.map((c) => c.x));
  const maxX = Math.max(...chars.map((c) => c.x + c.width));
  const top = Math.min(...chars.map((c) => c.y - c.height));
  const bottom = Math.max(...chars.map((c) => c.y));
  const width = maxX - minX;
  const height = bottom - top;

  const text = chars.map((c) => c.char).join("");

  const bbox = { x: minX, y: top, width, height };

  return {
    text,
    word: text,
    startIndex: chars[0].index,
    endIndex: chars[chars.length - 1].index,
    x: minX,
    y: top,
    width,
    height,
    bbox,
    characters: chars,
  };
}
