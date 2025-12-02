// World interaction stubs
export const worldInteractions = {
  enterZone(entity, zone) {
    zone?.onEnter?.(entity);
  },
  leaveZone(entity, zone) {
    zone?.onLeave?.(entity);
  },
};
