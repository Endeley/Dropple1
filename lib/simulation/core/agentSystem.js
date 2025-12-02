export function createAgent({ personality = [], goals = [], behavior = "idle", state = "neutral" } = {}) {
  return {
    id: `agent_${Math.random().toString(36).slice(2, 8)}`,
    personality,
    goals,
    behavior,
    emotionalState: state,
    position: [0, 0, 0],
    velocity: [0, 0, 0],
  };
}

export function updateAgent(agent, delta) {
  // Placeholder: would evaluate behavior tree and update position/velocity.
  return { ...agent, lastUpdate: delta };
}
