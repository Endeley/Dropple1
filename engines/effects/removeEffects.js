export const removeEffects = (obj) => {
    obj.filters = [];
    obj.set('shadow', null);
    obj.globalCompositeOperation = 'source-over';
    obj.applyFilters();
};
