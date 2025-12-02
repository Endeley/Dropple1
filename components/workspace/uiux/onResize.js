import { useSelectionStore } from "@/stores/selectionStore";
import { useNodesStore } from "@/stores/nodesStore";

const GRID = 20;

export function onResize(e, handle, node, zoom) {
  const { resizeStart } = useSelectionStore.getState();
  const updateNode = useNodesStore.getState().updateNode;

  if (!resizeStart) return;

  const dx = (e.clientX - resizeStart.mouseX) / zoom;
  const dy = (e.clientY - resizeStart.mouseY) / zoom;

  let { x, y, width, height } = resizeStart;

  if (handle === "tl") {
    x = snap(x + dx);
    y = snap(y + dy);
    width = snap(width - dx);
    height = snap(height - dy);
  } else if (handle === "tm") {
    y = snap(y + dy);
    height = snap(height - dy);
  } else if (handle === "tr") {
    y = snap(y + dy);
    width = snap(width + dx);
    height = snap(height - dy);
  } else if (handle === "mr") {
    width = snap(width + dx);
  } else if (handle === "br") {
    width = snap(width + dx);
    height = snap(height + dy);
  } else if (handle === "bm") {
    height = snap(height + dy);
  } else if (handle === "bl") {
    x = snap(x + dx);
    width = snap(width - dx);
  } else if (handle === "ml") {
    x = snap(x + dx);
    width = snap(width - dx);
  }

  updateNode(node.id, { x, y, width, height });
}

export function endResize() {
  const end = useSelectionStore.getState().endResize;
  end();
}

function snap(v) {
  return Math.round(v / GRID) * GRID;
}
