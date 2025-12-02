export function computeSnap(frame, otherFrames, tolerance = 8) {
  const guides = [];
  let snapX = frame.x;
  let snapY = frame.y;

  const left = frame.x;
  const right = frame.x + frame.width;
  const top = frame.y;
  const bottom = frame.y + frame.height;
  const cx = frame.x + frame.width / 2;
  const cy = frame.y + frame.height / 2;

  otherFrames.forEach((o) => {
    const ol = o.x;
    const or = o.x + o.width;
    const ot = o.y;
    const ob = o.y + o.height;
    const ocx = o.x + o.width / 2;
    const ocy = o.y + o.height / 2;

    if (Math.abs(left - ol) < tolerance) {
      snapX = ol;
      guides.push({ x1: ol, x2: ol, y1: Math.min(top, ot), y2: Math.max(bottom, ob) });
    }

    if (Math.abs(right - or) < tolerance) {
      snapX = or - frame.width;
      guides.push({ x1: or, x2: or, y1: Math.min(top, ot), y2: Math.max(bottom, ob) });
    }

    if (Math.abs(cx - ocx) < tolerance) {
      snapX = ocx - frame.width / 2;
      guides.push({ x1: ocx, x2: ocx, y1: Math.min(top, ot), y2: Math.max(bottom, ob) });
    }

    if (Math.abs(top - ot) < tolerance) {
      snapY = ot;
      guides.push({ y1: ot, y2: ot, x1: Math.min(left, ol), x2: Math.max(right, or) });
    }

    if (Math.abs(bottom - ob) < tolerance) {
      snapY = ob - frame.height;
      guides.push({ y1: ob, y2: ob, x1: Math.min(left, ol), x2: Math.max(right, or) });
    }

    if (Math.abs(cy - ocy) < tolerance) {
      snapY = ocy - frame.height / 2;
      guides.push({ y1: ocy, y2: ocy, x1: Math.min(left, ol), x2: Math.max(right, or) });
    }
  });

  return { snapX, snapY, guides };
}
