export function createBeliefs() {
  return { facts: [], assumptions: [] };
}

export function addBelief(beliefs, fact) {
  return { ...beliefs, facts: [...beliefs.facts, fact] };
}
