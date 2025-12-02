export function applyRules(input = {}, rules = []) {
  return rules.reduce((acc, r) => ({ ...acc, [r.key]: r.value }), input);
}
