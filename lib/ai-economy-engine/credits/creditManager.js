let balances = {};

export function addCredits(userId, amount) {
  balances[userId] = (balances[userId] || 0) + amount;
  return balances[userId];
}

export function spendCredits(userId, amount) {
  const current = balances[userId] || 0;
  if (current < amount) return { ok: false, balance: current };
  balances[userId] = current - amount;
  return { ok: true, balance: balances[userId] };
}

export function getBalance(userId) {
  return balances[userId] || 0;
}
