const anchors = [];

export function addAnchor(type = "plane", data = {}) {
  const anchor = { id: `anchor_${Math.random().toString(36).slice(2, 8)}`, type, data };
  anchors.push(anchor);
  return anchor;
}

export function listAnchors() {
  return anchors;
}
