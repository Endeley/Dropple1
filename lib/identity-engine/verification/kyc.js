export function submitKYC(userId, data = {}) {
  return { userId, status: "pending", data };
}
