// Integration stubs wiring the interaction engine into other subsystems.
export const interactionIntegration = {
  withLayerEngine(layerEngine) {
    return { layerEngine, status: "linked" };
  },
  withObjectEngine(objectEngine) {
    return { objectEngine, status: "linked" };
  },
  withSceneEngine(sceneEngine) {
    return { sceneEngine, status: "linked" };
  },
  withPhysicsEngine(physicsEngine) {
    return { physicsEngine, status: "linked" };
  },
  withAgentFramework(agentFramework) {
    return { agentFramework, status: "linked" };
  },
};
