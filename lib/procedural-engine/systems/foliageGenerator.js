export function scatterFoliage({ count = 10 } = {}) {
  return Array.from({ length: count }).map((_, i) => ({ id: `tree_${i}`, pos: [Math.random(), Math.random()] }));
}
