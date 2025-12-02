const semantic = new Map();

export function setSemantic(key, value) {
  semantic.set(key, value);
}

export function getSemantic(key) {
  return semantic.get(key);
}
