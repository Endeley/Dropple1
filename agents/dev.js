export default {
  id: "dev",
  name: "Dev Agent",
  description: "Converts designs to production-ready code",
  tools: [],
  async onMessage(message) {
    console.log("Dev agent", message);
    return "Generated code snippet (placeholder).";
  },
};
