import { ensureLayoutProps } from './layoutDefaults';

const setScaleForDimension = (child, dimension, target) => {
    const base = dimension === 'width' ? child.width || 1 : child.height || 1;
    if (!base) return;
    const scaleProp = dimension === 'width' ? 'scaleX' : 'scaleY';
    child.set({ [scaleProp]: target / base });
};

export const applyFill = (frame, child) => {
    if (!frame || !child) return;
    ensureLayoutProps(frame);
    ensureLayoutProps(child);

    const props = frame.layoutProps;
    const childSizing = child.layoutProps?.sizing || {};

    const availableWidth =
        frame.getScaledWidth() - props.padding.left - props.padding.right;
    const availableHeight =
        frame.getScaledHeight() - props.padding.top - props.padding.bottom;

    if (childSizing.width === 'fill' && availableWidth >= 0) {
        setScaleForDimension(child, 'width', availableWidth);
    }

    if (childSizing.height === 'fill' && availableHeight >= 0) {
        setScaleForDimension(child, 'height', availableHeight);
    }

    child.setCoords();
};
