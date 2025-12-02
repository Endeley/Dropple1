export const getLayerIcon = (object) => {
    switch (object.type) {
        case 'textbox':
            return '🅰️';
        case 'image':
            return '🖼️';
        case 'rect':
            return '▭';
        case 'circle':
            return '⬤';
        case 'triangle':
            return '▲';
        case 'group':
            return '📁';
        default:
            return '⬚';
    }
};
