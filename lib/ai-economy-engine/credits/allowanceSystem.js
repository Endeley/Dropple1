const allowances = new Map();

export function setAllowance(userId, amount) {
  allowances.set(userId, amount);
}

export function getAllowance(userId) {
  return allowances.get(userId) || 0;
}
