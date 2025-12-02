import { ensureLayoutProps } from './layoutDefaults';

const clampIndex = (index, length) => {
    if (index < 0) return 0;
    if (index > length) return length;
    return index;
};

export const computeInsertIndicator = (frame, index) => {
    if (!frame) return null;
    const props = ensureLayoutProps(frame);
    const frameRect = frame.getBoundingRect(true, true);
    const rects = props.childRects || [];

    const safeIndex = clampIndex(index ?? 0, rects.length);
    if (props.direction === 'vertical') {
        let y;
        if (!rects.length) {
            y = frameRect.top + props.padding.top;
        } else if (safeIndex === 0) {
            y = rects[0]?.top ?? frameRect.top + props.padding.top;
        } else if (safeIndex === rects.length) {
            const last = rects[rects.length - 1];
            y = (last?.top ?? frameRect.top) + (last?.height ?? 0);
        } else {
            y = rects[safeIndex]?.top ?? frameRect.top;
        }

        return {
            type: 'horizontal',
            x: frameRect.left,
            y,
            width: frameRect.width,
            height: 2,
        };
    }

    if (props.direction === 'horizontal') {
        let x;
        if (!rects.length) {
            x = frameRect.left + props.padding.left;
        } else if (safeIndex === 0) {
            x = rects[0]?.left ?? frameRect.left + props.padding.left;
        } else if (safeIndex === rects.length) {
            const last = rects[rects.length - 1];
            x = (last?.left ?? frameRect.left) + (last?.width ?? 0);
        } else {
            x = rects[safeIndex]?.left ?? frameRect.left;
        }

        return {
            type: 'vertical',
            x,
            y: frameRect.top,
            width: 2,
            height: frameRect.height,
        };
    }

    return null;
};
