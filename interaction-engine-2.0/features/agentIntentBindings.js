// Agent intent binding stub
export const bindAgentIntent = (agent, intent, action) => {
  if (!agent || !intent || !action) return () => {};
  agent._intents = agent._intents || new Map();
  agent._intents.set(intent, action);
  return () => agent._intents.delete(intent);
};
