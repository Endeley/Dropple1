const ort = require("onnxruntime-node");

module.exports = async function runLocalSD(payload) {
  try {
    const session = await ort.InferenceSession.create("./models/sdxl.onnx", {
      executionProviders: ["CUDAExecutionProvider", "CPUExecutionProvider"],
    });
    const outputs = await session.run(payload.input || {});
    return outputs;
  } catch (error) {
    console.error("Local SDXL error", error);
    throw error;
  }
};
