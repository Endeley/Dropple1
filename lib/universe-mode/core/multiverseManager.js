const multiverse = [];

export function addReality(label = "canon") {
  const reality = { id: `real_${Math.random().toString(36).slice(2, 8)}`, label, timelines: [] };
  multiverse.push(reality);
  return reality;
}

export function listRealities() {
  return multiverse;
}
