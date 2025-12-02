export const COMPONENT_PROP_KEYS = [
    'left',
    'top',
    'width',
    'height',
    'scaleX',
    'scaleY',
    'angle',
    'skewX',
    'skewY',
    'opacity',
    'fill',
    'stroke',
    'strokeWidth',
    'rx',
    'ry',
];

export const TEXT_PROP_KEYS = ['text', 'fontSize', 'fontFamily', 'fontWeight'];

const collectKeysForObject = (obj) => {
    if (!obj) return [];
    return obj.type === 'i-text' || obj.type === 'textbox'
        ? [...COMPONENT_PROP_KEYS, ...TEXT_PROP_KEYS]
        : COMPONENT_PROP_KEYS;
};

export const ensureObjectIds = (obj) => {
    if (!obj) return null;
    if (!obj.__objectId) {
        obj.__objectId = crypto.randomUUID();
    }
    return obj.__objectId;
};

export const extractComponentProps = (obj) => {
    if (!obj) return {};
    const keys = collectKeysForObject(obj);
    const data = {};
    keys.forEach((key) => {
        if (obj[key] !== undefined) {
            data[key] = obj[key];
        }
    });
    return data;
};

export const applyComponentProperties = (obj, props = {}) => {
    if (!obj || !props) return;
    obj.set(props);
    obj.setCoords();
};

export const diffProps = (current = {}, base = {}) => {
    const result = {};
    const keys = new Set([...Object.keys(current), ...Object.keys(base)]);
    keys.forEach((key) => {
        if (current[key] !== base[key]) {
            result[key] = current[key];
        }
    });
    return result;
};
