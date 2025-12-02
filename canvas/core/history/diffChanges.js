export function diffChanges(prev, next) {
  const undo = [];
  const redo = [];

  walk(prev, next, [], undo, redo);

  return { undo, redo };
}

function walk(prev, next, path, undo, redo) {
  const prevType = getType(prev);
  const nextType = getType(next);

  if (prevType !== nextType) {
    undo.push({ path, value: clone(prev) });
    redo.push({ path, value: clone(next) });
    return;
  }

  if (isPrimitive(prev)) {
    if (prev !== next) {
      undo.push({ path, value: clone(prev) });
      redo.push({ path, value: clone(next) });
    }
    return;
  }

  if (Array.isArray(prev)) {
    const maxLen = Math.max(prev?.length || 0, next?.length || 0);
    for (let i = 0; i < maxLen; i += 1) {
      walk(prev?.[i], next?.[i], [...path, i], undo, redo);
    }
    return;
  }

  const keys = new Set([
    ...Object.keys(prev || {}),
    ...Object.keys(next || {}),
  ]);

  keys.forEach((key) => {
    walk(prev?.[key], next?.[key], [...path, key], undo, redo);
  });
}

function getType(value) {
  if (Array.isArray(value)) return "array";
  return value === null ? "null" : typeof value;
}

function isPrimitive(value) {
  return value === null || typeof value !== "object";
}

function clone(value) {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
}
