"use client";

export function interpolateEnterExit(prevSlot, nextSlot, t = 0) {
  if (!prevSlot && nextSlot) {
    const targetOpacity = nextSlot.content?.opacity ?? 1;
    return {
      ...nextSlot,
      content: {
        ...nextSlot.content,
        opacity: targetOpacity * t,
        scale: 0.85 + 0.15 * t,
      },
    };
  }

  if (prevSlot && !nextSlot) {
    const baseOpacity = prevSlot.content?.opacity ?? 1;
    return {
      ...prevSlot,
      content: {
        ...prevSlot.content,
        opacity: baseOpacity * (1 - t),
        scale: 1 - 0.15 * t,
      },
    };
  }

  return null;
}
