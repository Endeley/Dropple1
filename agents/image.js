export default {
  id: "image",
  name: "Image Agent",
  description: "Smart edit and image manipulation agent",
  tools: ["updateLayer"],
  async onMessage(message) {
    console.log("Image agent", message);
    return "Image edit applied (placeholder).";
  },
};
