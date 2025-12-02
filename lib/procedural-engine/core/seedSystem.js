export function createSeed(value = Date.now()) {
  return Number(value) % 4294967296;
}
