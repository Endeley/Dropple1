export function createStateMachine(initial = "idle") {
  return {
    state: initial,
    transitions: {},
    variables: {},
  };
}

export function addTransition(machine, from, event, to) {
  const transitions = { ...machine.transitions };
  transitions[from] = transitions[from] || {};
  transitions[from][event] = to;
  return { ...machine, transitions };
}

export function applyEvent(machine, event) {
  const next = machine.transitions[machine.state]?.[event];
  if (!next) return machine;
  return { ...machine, state: next };
}
