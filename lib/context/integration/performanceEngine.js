export function flagHeavyContext(state = {}) {
  const heavy = (state.layers || []).length > 50 || (state.assets || []).length > 20;
  return { heavy, note: heavy ? "Consider hiding off-screen panels" : "All clear" };
}
