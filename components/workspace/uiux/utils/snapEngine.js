const SNAP_THRESHOLD = 6;

export function computeSnap({ movingNodeId, nodes, proposedX, proposedY }) {
  const guides = [];
  let snapX = proposedX;
  let snapY = proposedY;

  const moving = nodes[movingNodeId];
  if (!moving) return { x: proposedX, y: proposedY, guides: [] };

  const centerX = proposedX + moving.width / 2;
  const centerY = proposedY + moving.height / 2;

  Object.values(nodes).forEach((node) => {
    if (!node || node.id === movingNodeId) return;

    const otherCenterX = node.x + node.width / 2;
    const otherCenterY = node.y + node.height / 2;

    if (Math.abs(centerX - otherCenterX) < SNAP_THRESHOLD) {
      snapX = otherCenterX - moving.width / 2;
      guides.push({
        type: "vertical",
        x: otherCenterX,
        y: Math.min(node.y, proposedY),
        length: Math.abs(node.y - proposedY) + moving.height,
      });
    }

    if (Math.abs(centerY - otherCenterY) < SNAP_THRESHOLD) {
      snapY = otherCenterY - moving.height / 2;
      guides.push({
        type: "horizontal",
        y: otherCenterY,
        x: Math.min(node.x, proposedX),
        length: Math.abs(node.x - proposedX) + moving.width,
      });
    }

    if (Math.abs(proposedX - node.x) < SNAP_THRESHOLD) {
      snapX = node.x;
      guides.push({
        type: "vertical",
        x: node.x,
        y: Math.min(node.y, proposedY),
        length: moving.height + node.height,
      });
    }

    if (Math.abs(proposedX + moving.width - (node.x + node.width)) < SNAP_THRESHOLD) {
      snapX = node.x + node.width - moving.width;
      guides.push({
        type: "vertical",
        x: node.x + node.width,
        y: Math.min(node.y, proposedY),
        length: moving.height + node.height,
      });
    }

    if (Math.abs(proposedY - node.y) < SNAP_THRESHOLD) {
      snapY = node.y;
      guides.push({
        type: "horizontal",
        y: node.y,
        x: Math.min(node.x, proposedX),
        length: moving.width + node.width,
      });
    }

    if (Math.abs(proposedY + moving.height - (node.y + node.height)) < SNAP_THRESHOLD) {
      snapY = node.y + node.height - moving.height;
      guides.push({
        type: "horizontal",
        y: node.y + node.height,
        x: Math.min(node.x, proposedX),
        length: moving.width + node.width,
      });
    }

    const spacingX = proposedX - (node.x + node.width);
    const spacingX2 = node.x - (proposedX + moving.width);

    if (Math.abs(spacingX - spacingX2) < SNAP_THRESHOLD) {
      guides.push({
        type: "spacing",
        x: proposedX - spacingX,
        y: node.y,
        length: spacingX,
      });
    }
  });

  return { x: snapX, y: snapY, guides };
}
