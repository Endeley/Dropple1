import { ensureLayoutProps, getObjectId } from './layoutDefaults';

const collectChildRects = (frame, canvas) => {
    const props = frame.layoutProps;
    if (!props?.children?.length) return [];
    return props.children
        .map((id, idx) => {
            const child = canvas
                .getObjects()
                .find((obj) => getObjectId(obj, `obj-${idx}`) === id);
            return child?.getBoundingRect(true, true);
        })
        .filter(Boolean);
};

export const applyHug = (frame, canvas, options = { width: true, height: true }) => {
    if (!frame || !canvas) return;
    ensureLayoutProps(frame);

    const props = frame.layoutProps;
    if (!props.autoLayout) return;

    const rects = collectChildRects(frame, canvas);
    if (!rects.length) return;

    const minLeft = Math.min(...rects.map((r) => r.left));
    const maxRight = Math.max(...rects.map((r) => r.left + r.width));
    const minTop = Math.min(...rects.map((r) => r.top));
    const maxBottom = Math.max(...rects.map((r) => r.top + r.height));

    const next = {};

    if (options.width) {
        next.width =
            maxRight - minLeft + props.padding.left + props.padding.right;
    }

    if (options.height) {
        next.height =
            maxBottom - minTop + props.padding.top + props.padding.bottom;
    }

    frame.set(next);
    frame.setCoords();
};
