export function placeObjects(base = [], props = []) {
  // Simple placeholder: append props to base, mark positions incrementally.
  let x = 0;
  const placed = props.map((p) => {
    x += 1.5;
    return {
      id: `prop_${p}_${Math.random().toString(36).slice(2, 8)}`,
      type: p,
      position: [x, 0, 0],
    };
  });
  return [...base, ...placed];
}
