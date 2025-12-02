const prefs = new Map();

export function setPreference(key, value) {
  prefs.set(key, value);
}

export function getPreference(key) {
  return prefs.get(key);
}
