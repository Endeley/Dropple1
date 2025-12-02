export function syncWorldRequirements(plan = []) {
  const needs3D = plan.some((p) => p.action?.includes("3d"));
  return { needs3D, status: "synced" };
}
