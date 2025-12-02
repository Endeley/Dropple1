// XR interaction stubs
export const xrInteractions = {
  gaze(target, payload) {
    target?.onGaze?.(payload);
  },
  grab(target, payload) {
    target?.onGrab?.(payload);
  },
  release(target, payload) {
    target?.onRelease?.(payload);
  },
};
