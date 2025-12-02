export function generateGestures(count = 5) {
  return Array.from({ length: count }).map((_, i) => ({ id: `gesture_${i}`, type: "wave" }));
}
