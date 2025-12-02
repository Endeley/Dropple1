export function computeResize(frame, handle, dx, dy, options = {}) {
  if (!frame || !handle) return null;

  const {
    minSize = 20,
    lockAspectRatio = false,
    scaleFromCenter = false,
  } = options;

  const startX = frame.x ?? 0;
  const startY = frame.y ?? 0;
  const startWidth = frame.width ?? 0;
  const startHeight = frame.height ?? 0;
  const aspectRatio = startHeight !== 0 ? startWidth / startHeight : 1;

  const hasRight = handle.includes("e") || handle.includes("r");
  const hasLeft = handle.includes("w") || handle.includes("l");
  const hasBottom = handle.includes("s") || handle.includes("b");
  const hasTop = handle.includes("n") || handle.includes("t");

  const handleX = hasRight ? 1 : hasLeft ? -1 : 0;
  const handleY = hasBottom ? 1 : hasTop ? -1 : 0;

  let width = startWidth;
  let height = startHeight;
  let x = startX;
  let y = startY;

  if (handleX !== 0) {
    if (scaleFromCenter) {
      width = startWidth + dx * handleX * 2;
      x = startX - (width - startWidth) / 2;
    } else {
      width = startWidth + dx * handleX;
      if (handleX === -1) {
        x = startX + dx;
      }
    }
  }

  if (handleY !== 0) {
    if (scaleFromCenter) {
      height = startHeight + dy * handleY * 2;
      y = startY - (height - startHeight) / 2;
    } else {
      height = startHeight + dy * handleY;
      if (handleY === -1) {
        y = startY + dy;
      }
    }
  }

  if (lockAspectRatio && aspectRatio > 0) {
    const widthChange = Math.abs(width - startWidth);
    const heightChange = Math.abs(height - startHeight);

    if (handleX === 0 && handleY !== 0) {
      width = height * aspectRatio;
      if (scaleFromCenter) {
        x = startX - (width - startWidth) / 2;
      } else {
        x = startX + (startWidth - width) / 2;
      }
    } else if (handleY === 0 && handleX !== 0) {
      height = width / aspectRatio;
      if (scaleFromCenter) {
        y = startY - (height - startHeight) / 2;
      } else {
        y = startY + (startHeight - height) / 2;
      }
    } else if (handleX !== 0 && handleY !== 0) {
      if (widthChange > heightChange) {
        height = width / aspectRatio;
        if (scaleFromCenter || handleY === 0) {
          y = startY - (height - startHeight) / 2;
        } else if (handleY === -1) {
          y = startY + startHeight - height;
        } else {
          y = startY;
        }
      } else {
        width = height * aspectRatio;
        if (scaleFromCenter || handleX === 0) {
          x = startX - (width - startWidth) / 2;
        } else if (handleX === -1) {
          x = startX + startWidth - width;
        } else {
          x = startX;
        }
      }
    }
  }

  if (width < minSize) {
    if (scaleFromCenter || handleX === 0) {
      x = startX - (minSize - startWidth) / 2;
    } else if (handle.includes("w")) {
      x += width - minSize;
    }
    width = minSize;
  }

  if (height < minSize) {
    if (scaleFromCenter || handleY === 0) {
      y = startY - (minSize - startHeight) / 2;
    } else if (handle.includes("n")) {
      y += height - minSize;
    }
    height = minSize;
  }

  return { x, y, width, height };
}
