export function injectMemoryContext(state = {}, memories = []) {
  return { ...state, memories };
}
