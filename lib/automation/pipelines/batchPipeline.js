export function runBatch(items = [], op = () => ({})) {
  return items.map((item, i) => ({
    index: i,
    result: op(item),
  }));
}
