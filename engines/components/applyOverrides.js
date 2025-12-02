export const applyOverrides = (instanceObj, overrides = {}) => {
    if (!instanceObj || !overrides) return;
    Object.entries(overrides).forEach(([key, value]) => {
        if (value !== undefined) {
            instanceObj.set({ [key]: value });
        }
    });
    instanceObj.setCoords();
};
