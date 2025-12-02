import { ensureLayoutProps, getObjectId } from './layoutDefaults';
import { applyFill } from './applyFill';
import { applyHug } from './applyHug';
import { applyConstraints } from './applyConstraints';

const findChild = (canvas, id) =>
    canvas.getObjects().find((obj) => getObjectId(obj) === id);

const computeSpacingValue = (props, innerSize, totalChildrenSize, count) => {
    if (count <= 1) return 0;
    switch (props.distribution) {
        case 'space-between':
            return (innerSize - totalChildrenSize) / (count - 1);
        case 'space-evenly':
            return (innerSize - totalChildrenSize) / (count + 1);
        default:
            return props.spacing;
    }
};

const computeInitialOffset = (distribution, spacingValue) => {
    if (distribution === 'space-evenly') {
        return spacingValue;
    }
    return 0;
};

const computeHorizontalAlignment = (frameRect, childWidth, props) => {
    if (props.alignment === 'center') {
        return frameRect.left + (frameRect.width - childWidth) / 2;
    }
    if (props.alignment === 'end') {
        return (
            frameRect.left +
            frameRect.width -
            props.padding.right -
            childWidth
        );
    }
    return frameRect.left + props.padding.left;
};

const computeVerticalAlignment = (frameRect, childHeight, props) => {
    if (props.alignment === 'center') {
        return frameRect.top + (frameRect.height - childHeight) / 2;
    }
    if (props.alignment === 'end') {
        return (
            frameRect.top +
            frameRect.height -
            props.padding.bottom -
            childHeight
        );
    }
    return frameRect.top + props.padding.top;
};

export const applyAutoLayout = (frame, canvas) => {
    if (!frame || !canvas) return;
    const props = ensureLayoutProps(frame);
    if (!props.autoLayout) return;

    if (!props.children?.length && frame._objects?.length) {
        props.children = frame._objects.map((obj, idx) =>
            getObjectId(obj, `child-${idx}`)
        );
    }

    const frameRect = frame.getBoundingRect(true, true);
    const frameInnerWidth =
        frameRect.width - props.padding.left - props.padding.right;
    const frameInnerHeight =
        frameRect.height - props.padding.top - props.padding.bottom;

    const children = props.children
        .map((id) => findChild(canvas, id))
        .filter(Boolean);

    props.childRects = children.map((child) =>
        child.getBoundingRect(true, true)
    );

    if (!children.length) return;

    const horizontal = props.direction === 'horizontal';
    const totalChildrenSize = children.reduce((acc, child) => {
        const rect = child.getBoundingRect(true, true);
        return acc + (horizontal ? rect.width : rect.height);
    }, 0);

    const spacingValue = computeSpacingValue(
        props,
        horizontal ? frameInnerWidth : frameInnerHeight,
        totalChildrenSize,
        children.length
    );
    let cursorX =
        props.padding.left + (horizontal ? computeInitialOffset(props.distribution, spacingValue) : 0);
    let cursorY =
        props.padding.top + (!horizontal ? computeInitialOffset(props.distribution, spacingValue) : 0);

    children.forEach((child, idx) => {
        ensureLayoutProps(child);
        const rect = props.childRects[idx] || child.getBoundingRect(true, true);
        if (props.direction === 'vertical') {
            const left = computeHorizontalAlignment(frameRect, rect.width, props);
            const top = frameRect.top + cursorY;
            child.set({ left, top });
            cursorY += rect.height + spacingValue;
        } else {
            const left = frameRect.left + cursorX;
            const top = computeVerticalAlignment(frameRect, rect.height, props);
            child.set({ left, top });
            cursorX += rect.width + spacingValue;
        }

        applyFill(frame, child);
        applyConstraints(frame, child);
        child.setCoords();
    });

    if (
        props.sizing?.width === 'hug' ||
        props.sizing?.height === 'hug'
    ) {
        applyHug(frame, canvas, {
            width: props.sizing?.width === 'hug',
            height: props.sizing?.height === 'hug',
        });
    }

    frame.setCoords();
    canvas.requestRenderAll();
};
