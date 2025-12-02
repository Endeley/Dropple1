export function roll(clipA, clipB, delta = 0) {
  clipA.end = (clipA.end || 0) + delta;
  clipB.start = (clipB.start || 0) + delta;
  return [clipA, clipB];
}
