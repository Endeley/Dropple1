export const applyMotionPath = (obj, pathFn, t) => {
    const { x, y } = pathFn(t);
    obj.set({ left: x, top: y });
};
