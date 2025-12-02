export default {
  id: "audio",
  name: "Audio Agent",
  description: "Generates and edits audio",
  tools: [],
  async onMessage(message) {
    console.log("Audio agent", message);
    return "Audio processing complete (placeholder).";
  },
};
