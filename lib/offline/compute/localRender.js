export function renderLocal({ sceneId, format = "png" }) {
  return {
    ok: true,
    sceneId,
    format,
    note: "Local render placeholder",
  };
}
