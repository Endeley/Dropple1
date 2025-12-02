// Simple state machine scaffold.
export const createStateMachine = (initial = "idle") => {
  let state = initial;
  const transitions = new Map();

  const addTransition = (from, to, condition = () => true, action = () => {}) => {
    if (!transitions.has(from)) transitions.set(from, []);
    transitions.get(from).push({ to, condition, action });
  };

  const step = (context) => {
    const rules = transitions.get(state) || [];
    for (const rule of rules) {
      if (rule.condition(context)) {
        rule.action(context);
        state = rule.to;
        break;
      }
    }
    return state;
  };

  return { addTransition, step, get state() { return state; } };
};
