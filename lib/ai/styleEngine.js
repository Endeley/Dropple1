const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const curve = (base, scale = 1) => Math.round(clamp(base * scale, 4, 96));

export function applySmartStyles(layout, depth = 0) {
    const density = Math.max(1, layout?.children?.length || 1);
    layout.spacing = layout.spacing ?? curve(12, 1 + density * 0.05);
    layout.padding = layout.padding ?? {
        top: curve(24, 1 + depth * 0.05),
        right: curve(24, 1 + depth * 0.05),
        bottom: curve(24, 1 + depth * 0.05),
        left: curve(24, 1 + depth * 0.05),
    };
    layout.alignment = layout.alignment || 'start';

    if (Array.isArray(layout.children)) {
        layout.children = layout.children.map((child) => applySmartStyles(child, depth + 1));
    }

    return layout;
}
