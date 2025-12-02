const signatures = new Map();

export function saveUserStyle(userId, embedding) {
  signatures.set(userId, embedding);
}

export function getUserStyle(userId) {
  return signatures.get(userId);
}
