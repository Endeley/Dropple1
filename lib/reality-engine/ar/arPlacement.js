export function placeARObject(anchorId, obj = {}) {
  return { anchorId, obj, status: "placed" };
}
