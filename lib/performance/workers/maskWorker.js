self.onmessage = async (event) => {
  const { id, type, payload } = event.data;

  try {
    if (type === "CLEAR_MASK") {
      const canvas = payload?.canvas;
      canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      self.postMessage({ id, success: true });
      return;
    }

    self.postMessage({ id, error: "Unknown mask worker task" });
  } catch (error) {
    self.postMessage({ id, error: error.message || "Mask worker error" });
  }
};
