export const automationAPI = {
  applyBrand: (layer, brand = {}) => ({ ...layer, brand }),
  resize: (layer, w, h) => ({ ...layer, width: w, height: h }),
  addGlow: (layer) => ({ ...layer, effects: [...(layer.effects || []), "glow"] }),
  export: (format = "png") => ({ exported: true, format }),
};
