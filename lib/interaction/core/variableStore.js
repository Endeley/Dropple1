const vars = {};

export function setVar(key, value) {
  vars[key] = value;
  return vars;
}

export function getVar(key) {
  return vars[key];
}

export function getAllVars() {
  return { ...vars };
}
