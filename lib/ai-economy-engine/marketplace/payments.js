export function charge(userId, amount, method = "card") {
  return { userId, amount, method, status: "charged" };
}
