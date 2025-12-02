export const applyShadowEffect = (obj, params) => {
    obj.set('shadow', {
        color: params.color || 'rgba(0,0,0,0.4)',
        blur: params.blur || 10,
        offsetX: params.x || 5,
        offsetY: params.y || 5,
    });
};
