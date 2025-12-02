// Physics interaction stubs
export const physicsInteractions = {
  onCollisionStart(a, b) {
    a?.onCollisionStart?.(b);
    b?.onCollisionStart?.(a);
  },
  onCollisionEnd(a, b) {
    a?.onCollisionEnd?.(b);
    b?.onCollisionEnd?.(a);
  },
};
