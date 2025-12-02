export function allocateGPU(type = "rtx") {
  return { id: `gpu_${Math.random().toString(36).slice(2, 8)}`, type, status: "allocated" };
}
