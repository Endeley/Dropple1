export const applyOuterGlow = (obj, params) => {
    obj.set('shadow', {
        color: params.color || 'rgba(255,255,255,0.8)',
        blur: params.blur || 20,
        offsetX: 0,
        offsetY: 0,
    });
};
