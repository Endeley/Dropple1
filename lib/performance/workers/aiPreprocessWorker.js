self.onmessage = async (event) => {
  const { id, type, payload } = event.data;

  try {
    let result = null;

    if (type === "PREPARE_TEXT") {
      result = {
        prompt: payload?.prompt?.trim() || "",
        negativePrompt: payload?.negativePrompt?.trim() || "",
      };
    }

    self.postMessage({ id, success: true, data: result });
  } catch (error) {
    self.postMessage({ id, error: error.message || "Worker failure" });
  }
};
