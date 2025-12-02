export function animateMaterialOnTimeline(material, timelineId) {
  return { materialId: material.id, timelineId, status: "linked" };
}
