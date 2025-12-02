const DEFAULT_LAYOUT_PROPS = {
    autoLayout: false,
    direction: 'vertical',
    padding: { top: 16, right: 16, bottom: 16, left: 16 },
    spacing: 12,
    alignment: 'start', // start, center, end
    distribution: 'packed', // packed, space-between, space-evenly
    children: [],
    sizing: {
        width: 'fixed', // fixed | hug | fill
        height: 'fixed',
    },
    constraints: {
        horizontal: 'left', // left | right | center | stretch | scale
        vertical: 'top', // top | bottom | center | stretch | scale
    },
    constraintRatios: {
        horizontal: 1,
        vertical: 1,
    },
    editing: false,
    draggingChildId: null,
    dragOverIndex: null,
    childRects: [],
};

const clonePadding = (padding = {}) => ({
    top: padding.top ?? DEFAULT_LAYOUT_PROPS.padding.top,
    right: padding.right ?? DEFAULT_LAYOUT_PROPS.padding.right,
    bottom: padding.bottom ?? DEFAULT_LAYOUT_PROPS.padding.bottom,
    left: padding.left ?? DEFAULT_LAYOUT_PROPS.padding.left,
});

const cloneSizing = (sizing = {}) => ({
    width: sizing.width ?? DEFAULT_LAYOUT_PROPS.sizing.width,
    height: sizing.height ?? DEFAULT_LAYOUT_PROPS.sizing.height,
});

const cloneConstraints = (constraints = {}) => ({
    horizontal: constraints.horizontal ?? DEFAULT_LAYOUT_PROPS.constraints.horizontal,
    vertical: constraints.vertical ?? DEFAULT_LAYOUT_PROPS.constraints.vertical,
});

const cloneConstraintRatios = (ratios = {}) => ({
    horizontal: ratios.horizontal ?? DEFAULT_LAYOUT_PROPS.constraintRatios.horizontal,
    vertical: ratios.vertical ?? DEFAULT_LAYOUT_PROPS.constraintRatios.vertical,
});

export const getObjectId = (obj, fallback = null) => {
    if (!obj) return fallback;
    return obj.__objectId ?? obj.id ?? obj.name ?? fallback;
};

export const createDefaultLayoutProps = () => ({
    ...DEFAULT_LAYOUT_PROPS,
    padding: clonePadding(),
    sizing: cloneSizing(),
    constraints: cloneConstraints(),
    constraintRatios: cloneConstraintRatios(),
    children: [],
});

export const mergeLayoutProps = (overrides = {}) => ({
    ...createDefaultLayoutProps(),
    ...overrides,
    padding: clonePadding(overrides.padding),
    sizing: cloneSizing(overrides.sizing),
    constraints: cloneConstraints(overrides.constraints),
    constraintRatios: cloneConstraintRatios(overrides.constraintRatios),
    children: Array.isArray(overrides.children) ? overrides.children : [],
    childRects: Array.isArray(overrides.childRects) ? overrides.childRects : [],
});

export const ensureLayoutProps = (obj) => {
    if (!obj) return null;
    obj.layoutProps = mergeLayoutProps(obj.layoutProps ?? {});
    return obj.layoutProps;
};
