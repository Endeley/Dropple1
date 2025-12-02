export function diffStates(a = {}, b = {}) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const diff = {};
  keys.forEach((k) => {
    if (a[k] !== b[k]) diff[k] = { from: a[k], to: b[k] };
  });
  return diff;
}
