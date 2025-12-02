"use client";

import { useRef } from "react";

const SNAP_DISTANCE = 6;

export function useSnapGuides(definitionRef) {
  const guidesRef = useRef([]);

  const updateGuideLines = (snapX, snapY) => {
    const def = definitionRef.current;
    const width = def?.width ?? 0;
    const height = def?.height ?? 0;
    const lines = [];

    if (snapX !== null) {
      lines.push({
        x1: snapX,
        y1: 0,
        x2: snapX,
        y2: height,
      });
    }

    if (snapY !== null) {
      lines.push({
        x1: 0,
        y1: snapY,
        x2: width,
        y2: snapY,
      });
    }

    guidesRef.current = lines;
  };

  const clearGuides = () => {
    guidesRef.current = [];
  };

  const computeLines = () => {
    const def = definitionRef.current;
    if (!def?.slots) return { vertical: [], horizontal: [] };
    const vertical = [];
    const horizontal = [];

    def.slots.forEach((slot) => {
      if (slot.hidden || slot.visible === false) return;
      const f = slot.frame;
      if (!f) return;

      vertical.push({ type: "left", x: f.x });
      vertical.push({ type: "right", x: f.x + f.width });
      vertical.push({ type: "center-x", x: f.x + f.width / 2 });
      horizontal.push({ type: "top", y: f.y });
      horizontal.push({ type: "bottom", y: f.y + f.height });
      horizontal.push({ type: "center-y", y: f.y + f.height / 2 });
    });

    return { vertical, horizontal };
  };

  const applySnap = (slotId, candidate = {}, options = {}) => {
    const def = definitionRef.current;
    if (!def) return candidate;
    const slot = def.slots?.find((s) => s.id === slotId);
    if (!slot?.frame) return candidate;

    const mode = options.mode || "move";
    const handle = options.handle || { x: 0, y: 0 };

    const { vertical, horizontal } = computeLines();

    let guideX = null;
    let guideY = null;

    const includeWidth = typeof candidate.width === "number";
    const includeHeight = typeof candidate.height === "number";
    let width =
      (includeWidth ? candidate.width : slot.frame.width) ?? slot.frame.width ?? 0;
    let height =
      (includeHeight ? candidate.height : slot.frame.height) ?? slot.frame.height ?? 0;
    let nextX = candidate.x ?? slot.frame.x ?? 0;
    let nextY = candidate.y ?? slot.frame.y ?? 0;

    vertical.forEach((line) => {
      const leftEdge = nextX;
      const rightEdge = nextX + width;
      const center = nextX + width / 2;
      const deltaLeft = Math.abs(leftEdge - line.x);
      const deltaRight = Math.abs(rightEdge - line.x);
      const deltaMid = Math.abs(center - line.x);

      if (deltaLeft < SNAP_DISTANCE) {
        guideX = line.x;
        if (mode === "resize" && handle.x === -1 && includeWidth) {
          width = rightEdge - line.x;
        }
        nextX = line.x;
      } else if (deltaRight < SNAP_DISTANCE) {
        guideX = line.x;
        if (mode === "resize" && handle.x === 1 && includeWidth) {
          width = line.x - nextX;
        } else {
          nextX = line.x - width;
        }
      } else if (deltaMid < SNAP_DISTANCE) {
        guideX = line.x;
        nextX = line.x - width / 2;
      }
    });

    horizontal.forEach((line) => {
      const topEdge = nextY;
      const bottomEdge = nextY + height;
      const center = nextY + height / 2;
      const deltaTop = Math.abs(topEdge - line.y);
      const deltaBottom = Math.abs(bottomEdge - line.y);
      const deltaMid = Math.abs(center - line.y);

      if (deltaTop < SNAP_DISTANCE) {
        guideY = line.y;
        if (mode === "resize" && handle.y === -1 && includeHeight) {
          height = bottomEdge - line.y;
        }
        nextY = line.y;
      } else if (deltaBottom < SNAP_DISTANCE) {
        guideY = line.y;
        if (mode === "resize" && handle.y === 1 && includeHeight) {
          height = line.y - nextY;
        } else {
          nextY = line.y - height;
        }
      } else if (deltaMid < SNAP_DISTANCE) {
        guideY = line.y;
        nextY = line.y - height / 2;
      }
    });

    updateGuideLines(guideX, guideY);

    const result = {};
    if (candidate.x !== undefined || mode === "resize") {
      const fallbackX = candidate.x ?? slot.frame.x ?? 0;
      result.x = guideX !== null ? nextX : fallbackX;
    }
    if (candidate.y !== undefined || mode === "resize") {
      const fallbackY = candidate.y ?? slot.frame.y ?? 0;
      result.y = guideY !== null ? nextY : fallbackY;
    }
    if (includeWidth) {
      result.width = Math.max(1, width);
    }
    if (includeHeight) {
      result.height = Math.max(1, height);
    }

    return result;
  };

  const applySnapToGroup = (candidate, original) => {
    const def = definitionRef.current;
    if (!def) return candidate;

    const { vertical, horizontal } = computeLines();

    let snapX = null;
    let snapY = null;

    vertical.forEach((line) => {
      const deltaLeft = Math.abs(candidate.x - line.x);
      const deltaRight = Math.abs(candidate.x + original.width - line.x);
      const deltaMid = Math.abs(candidate.x + original.width / 2 - line.x);

      if (deltaLeft < SNAP_DISTANCE) snapX = line.x;
      if (deltaRight < SNAP_DISTANCE) snapX = line.x - original.width;
      if (deltaMid < SNAP_DISTANCE) snapX = line.x - original.width / 2;
    });

    horizontal.forEach((line) => {
      const deltaTop = Math.abs(candidate.y - line.y);
      const deltaBottom = Math.abs(candidate.y + original.height - line.y);
      const deltaMid = Math.abs(candidate.y + original.height / 2 - line.y);

      if (deltaTop < SNAP_DISTANCE) snapY = line.y;
      if (deltaBottom < SNAP_DISTANCE) snapY = line.y - original.height;
      if (deltaMid < SNAP_DISTANCE) snapY = line.y - original.height / 2;
    });

    updateGuideLines(snapX, snapY);

    return {
      x: snapX !== null ? snapX : candidate.x,
      y: snapY !== null ? snapY : candidate.y,
    };
  };

  const getGuides = () => guidesRef.current;

  return {
    getGuides,
    applySnap,
    applySnapToGroup,
    clearGuides,
  };
}
