export function recommendForUser(user = {}, candidates = []) {
  if (!candidates.length) return [];
  return candidates.slice(0, Math.min(10, candidates.length));
}
