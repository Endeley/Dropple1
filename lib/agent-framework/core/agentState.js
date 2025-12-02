export function setStatus(agent, status = "idle") {
  agent.state = agent.state || {};
  agent.state.status = status;
  return agent;
}
