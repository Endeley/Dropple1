import * as fabric from 'fabric';

const defaultText = (content, role) =>
    new fabric.Textbox(content || 'Text', {
        fontSize: role === 'headline' ? 40 : role === 'subtext' ? 20 : 18,
        fontWeight: role === 'headline' ? '700' : '400',
        fill: '#0f172a',
        width: role === 'headline' ? 520 : 420,
    });

const defaultButton = (node) => {
    const width = 180;
    const height = 50;
    const bg = new fabric.Rect({
        width,
        height,
        rx: 8,
        ry: 8,
        fill: node?.variant === 'ghost' ? '#ffffff' : '#6b4eff',
        stroke: node?.variant === 'ghost' ? '#6b4eff' : undefined,
    });
    const label = new fabric.Text(node?.label || 'Button', {
        fill: node?.variant === 'ghost' ? '#6b4eff' : '#ffffff',
        fontSize: 18,
        originX: 'center',
        originY: 'center',
    });
    const group = new fabric.Group([bg, label], { width, height });
    label.left = width / 2 - label.width / 2;
    label.top = height / 2 - label.height / 2;
    return group;
};

const imagePlaceholder = () =>
    new fabric.Rect({
        width: 380,
        height: 260,
        fill: '#e2e8f0',
        stroke: '#cbd5e1',
        rx: 16,
    });

const card = (node = {}) => {
    const cardWidth = 240;
    const cardHeight = 300;
    const bg = new fabric.Rect({
        width: cardWidth,
        height: cardHeight,
        rx: 14,
        ry: 14,
        fill: '#ffffff',
        stroke: '#e2e8f0',
    });
    const title = new fabric.Textbox(node.title || 'Title', {
        fontSize: 20,
        fontWeight: '700',
        fill: '#111827',
        width: cardWidth - 32,
        left: 16,
        top: 24,
    });
    const price = new fabric.Textbox(node.price || '$00', {
        fontSize: 28,
        fontWeight: '700',
        fill: '#6b4eff',
        width: cardWidth - 32,
        left: 16,
        top: title.top + 48,
    });
    const cta = defaultButton({ label: node.cta || 'Choose' });
    cta.left = cardWidth / 2 - cta.width / 2;
    cta.top = cardHeight - cta.height - 24;
    return new fabric.Group([bg, title, price, cta], {
        width: cardWidth,
        height: cardHeight,
    });
};

function positionChildren(group, direction, spacing) {
    const children = group._objects || [];
    let cursorX = 0;
    let cursorY = 0;
    children.forEach((child, idx) => {
        if (idx === 0) {
            child.left = 0;
            child.top = 0;
        } else {
            if (direction === 'row') {
                child.left = cursorX + spacing;
                child.top = 0;
            } else {
                child.left = 0;
                child.top = cursorY + spacing;
            }
        }
        cursorX = child.left + (child.width || 0);
        cursorY = child.top + (child.height || 0);
        child.setCoords?.();
    });
    group.addWithUpdate();
    group.setCoords?.();
}

export function buildLayoutNode(node, canvas, x = 0, y = 0) {
    if (!node) return null;
    switch (node.type) {
        case 'frame': {
            const direction = node.direction === 'row' ? 'row' : 'column';
            const spacing = node.spacing ?? 16;
            const group = new fabric.Group([], {
                left: x,
                top: y,
                layoutDirection: direction,
                layoutSpacing: spacing,
                padding: node.padding || { top: 0, right: 0, bottom: 0, left: 0 },
            });
            (node.children || []).forEach((child) => {
                const childObj = buildLayoutNode(child, canvas, 0, 0);
                if (childObj) group.addWithUpdate(childObj);
            });
            positionChildren(group, direction, spacing);
            canvas?.add(group);
            return group;
        }
        case 'text':
            return defaultText(node.content, node.role);
        case 'button':
            return defaultButton(node);
        case 'image':
            return imagePlaceholder();
        case 'card':
            return card(node);
        default:
            return defaultText(node.content || node.type || 'Text');
    }
}
