export function createChoice({ id, options = [] }) {
  return { id, options };
}

export function resolveChoice(choice, label) {
  const option = choice.options.find((o) => o.label === label);
  return option?.goTo || null;
}
