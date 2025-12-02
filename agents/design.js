export default {
  id: "design",
  name: "Design Agent",
  description: "Helps improve and create designs",
  tools: ["addLayer", "removeLayer", "updateLayer", "autoLayout"],
  async onMessage(message, tools) {
    console.log("Design agent received", message);
    if (message.includes("add section")) {
      tools.addLayer?.({ id: crypto.randomUUID(), type: "rect", name: "Section" });
      return "Added a new section to the design.";
    }
    return "Design agent processed your request.";
  },
};
