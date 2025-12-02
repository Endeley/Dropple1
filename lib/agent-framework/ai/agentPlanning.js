export function plan(agent, goal) {
  return { agent: agent.id, goal, steps: ["analyze", "execute"] };
}
