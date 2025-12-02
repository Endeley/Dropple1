export default {
  id: "template",
  name: "Template Agent",
  description: "Creates structured templates",
  tools: ["addLayer", "autoLayout"],
  async onMessage(message, tools) {
    console.log("Template agent", message);
    tools.autoLayout?.();
    return "Template generated (placeholder).";
  },
};
