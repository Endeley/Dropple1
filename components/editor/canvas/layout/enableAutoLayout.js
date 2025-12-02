import { ensureLayoutProps, getObjectId } from './layoutDefaults';

export const enableAutoLayout = (frame, direction = 'vertical') => {
    if (!frame) return null;

    const props = ensureLayoutProps(frame);
    props.autoLayout = true;
    props.direction = direction;
    props.padding = {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
    };
    props.spacing = 12;
    props.alignment = 'start';
    props.distribution = 'packed';
    props.sizing = {
        width: 'hug',
        height: 'hug',
    };

    if (frame._objects && frame._objects.length) {
        props.children = frame._objects.map((child, idx) => getObjectId(child, `child-${idx}`));
    }

    frame.layoutProps = props;
    return props;
};
