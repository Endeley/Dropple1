import { ensureLayoutProps } from './layoutDefaults';

const computeOffsets = (frame, child) => {
    const frameRect = frame.getBoundingRect(true, true);
    const childRect = child.getBoundingRect(true, true);

    return {
        frameRect,
        childRect,
        offsets: {
            left: childRect.left - frameRect.left,
            right:
                frameRect.left +
                frameRect.width -
                (childRect.left + childRect.width),
            top: childRect.top - frameRect.top,
            bottom:
                frameRect.top +
                frameRect.height -
                (childRect.top + childRect.height),
        },
    };
};

export const applyConstraints = (frame, child) => {
    if (!frame || !child) return;
    ensureLayoutProps(frame);
    ensureLayoutProps(child);

    const constraints = child.layoutProps.constraints;
    if (!constraints) return;

    const { frameRect, childRect, offsets } = computeOffsets(frame, child);

    // Horizontal constraints
    switch (constraints.horizontal) {
        case 'left':
            child.set({ left: frameRect.left + offsets.left });
            break;
        case 'right':
            child.set({
                left:
                    frameRect.left +
                    frameRect.width -
                    childRect.width -
                    offsets.right,
            });
            break;
        case 'center':
            child.set({
                left: frameRect.left + (frameRect.width - childRect.width) / 2,
            });
            break;
        case 'stretch': {
            const newWidth =
                frameRect.width - offsets.left - offsets.right;
            if (newWidth >= 0 && child.width) {
                child.set({
                    left: frameRect.left + offsets.left,
                    scaleX: newWidth / child.width,
                });
            }
            break;
        }
        case 'scale': {
            const ratio =
                child.layoutProps.constraintRatios.horizontal ||
                childRect.width / frameRect.width ||
                1;
            const target = frameRect.width * ratio;
            if (child.width) {
                child.set({
                    left: frameRect.left,
                    scaleX: target / child.width,
                });
            }
            child.layoutProps.constraintRatios.horizontal = ratio;
            break;
        }
        default:
            break;
    }

    // Vertical constraints
    switch (constraints.vertical) {
        case 'top':
            child.set({ top: frameRect.top + offsets.top });
            break;
        case 'bottom':
            child.set({
                top:
                    frameRect.top +
                    frameRect.height -
                    childRect.height -
                    offsets.bottom,
            });
            break;
        case 'center':
            child.set({
                top: frameRect.top + (frameRect.height - childRect.height) / 2,
            });
            break;
        case 'stretch': {
            const newHeight =
                frameRect.height - offsets.top - offsets.bottom;
            if (newHeight >= 0 && child.height) {
                child.set({
                    top: frameRect.top + offsets.top,
                    scaleY: newHeight / child.height,
                });
            }
            break;
        }
        case 'scale': {
            const ratio =
                child.layoutProps.constraintRatios.vertical ||
                childRect.height / frameRect.height ||
                1;
            const target = frameRect.height * ratio;
            if (child.height) {
                child.set({
                    top: frameRect.top,
                    scaleY: target / child.height,
                });
            }
            child.layoutProps.constraintRatios.vertical = ratio;
            break;
        }
        default:
            break;
    }

    child.setCoords();
};
