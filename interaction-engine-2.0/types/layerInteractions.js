// Layer interactions scaffold
export const layerInteractions = {
  applyAction(layer, action) {
    if (!layer) return;
    if (typeof action === "function") action(layer);
  },
};
