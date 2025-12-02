// Object interaction placeholders
export const objectInteractions = {
  collision(a, b, payload) {
    a?.onCollision?.(b, payload);
    b?.onCollision?.(a, payload);
  },
};
