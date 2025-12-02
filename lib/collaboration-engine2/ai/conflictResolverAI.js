export function resolveConflict(changeA, changeB) {
  return { winner: changeA || changeB, strategy: "prefer_local" };
}
