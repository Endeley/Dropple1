import { runAgent } from "./agentEngine";

export default {
  id: "director",
  name: "Director Agent",
  description: "Master agent orchestrating other agents",
  tools: [],
  async onMessage(message) {
    if (message.toLowerCase().includes("landing page")) {
      await runAgent("template", "Create landing page layout");
      await runAgent("design", "Polish the landing page");
      await runAgent("image", "Generate hero images");
      await runAgent("dev", "Export as React");
      return "Landing page created and exported.";
    }
    return "Director processed your request.";
  },
};
