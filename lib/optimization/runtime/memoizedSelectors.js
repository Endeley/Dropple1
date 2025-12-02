export function memoize(fn) {
  let cache = null;
  let argsKey = "";
  return (...args) => {
    const key = JSON.stringify(args);
    if (key === argsKey && cache !== null) return cache;
    argsKey = key;
    cache = fn(...args);
    return cache;
  };
}
