"use client";

export function diffSnapshots(prev, next) {
  if (!prev || !next) {
    return {
      moved: [],
      resized: [],
      style: [],
      text: [],
    };
  }

  const diffs = {
    moved: [],
    resized: [],
    style: [],
    text: [],
  };

  const prevMap = Object.fromEntries((prev.slots || []).map((slot) => [slot.id, slot]));
  const nextMap = Object.fromEntries((next.slots || []).map((slot) => [slot.id, slot]));

  Object.keys(nextMap).forEach((id) => {
    const before = prevMap[id];
    const after = nextMap[id];
    if (!before || !after) return;
    if (!before.frame || !after.frame) return;

    if (before.frame.x !== after.frame.x || before.frame.y !== after.frame.y) {
      diffs.moved.push({ id, frame: { ...after.frame } });
    }

    if (
      before.frame.width !== after.frame.width ||
      before.frame.height !== after.frame.height
    ) {
      diffs.resized.push({ id, frame: { ...after.frame } });
    }

    const beforeStyle = JSON.stringify({
      color: before.content?.color,
      fontFamily: before.content?.fontFamily,
      fontSize: before.content?.fontSize,
      fontWeight: before.content?.fontWeight,
      fill: before.content?.fill,
      stroke: before.content?.stroke,
    });
    const afterStyle = JSON.stringify({
      color: after.content?.color,
      fontFamily: after.content?.fontFamily,
      fontSize: after.content?.fontSize,
      fontWeight: after.content?.fontWeight,
      fill: after.content?.fill,
      stroke: after.content?.stroke,
    });

    if (beforeStyle !== afterStyle) {
      diffs.style.push({ id, frame: { ...after.frame } });
    }

    if ((before.content?.text || "") !== (after.content?.text || "")) {
      diffs.text.push({ id, frame: { ...after.frame } });
    }
  });

  return diffs;
}
