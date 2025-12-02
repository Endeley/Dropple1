export function payout(creatorId, amount, method = "stripe") {
  return { creatorId, amount, method, status: "queued" };
}
