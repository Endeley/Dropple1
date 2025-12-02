export default {
  id: "video",
  name: "Video Agent",
  description: "Automates video editing and generation",
  tools: ["addLayer", "updateLayer"],
  async onMessage(message) {
    console.log("Video agent", message);
    return "Video edits scheduled (placeholder).";
  },
};
