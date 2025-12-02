import { ensureLayoutProps, getObjectId } from './layoutDefaults';

const buildRects = (frame, canvas) => {
    const props = frame.layoutProps;
    if (props.childRects?.length === props.children?.length) {
        return props.childRects;
    }

    const rects =
        props.children?.map((id) => {
            const child = canvas.getObjects().find((o) => getObjectId(o) === id);
            return child?.getBoundingRect(true, true);
        }) ?? [];

    props.childRects = rects.filter(Boolean);
    return props.childRects;
};

export const computeInsertIndex = (frame, canvas, pointer) => {
    if (!frame || !canvas || !pointer) return null;
    const props = ensureLayoutProps(frame);
    const rects = buildRects(frame, canvas);
    if (!rects.length) return 0;

    if (props.direction === 'vertical') {
        for (let i = 0; i < rects.length; i += 1) {
            const rect = rects[i];
            if (!rect) continue;
            const midY = rect.top + rect.height / 2;
            if (pointer.y < midY) return i;
        }
        return rects.length;
    }

    if (props.direction === 'horizontal') {
        for (let i = 0; i < rects.length; i += 1) {
            const rect = rects[i];
            if (!rect) continue;
            const midX = rect.left + rect.width / 2;
            if (pointer.x < midX) return i;
        }
        return rects.length;
    }

    return null;
};
