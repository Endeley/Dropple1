import * as fabric from 'fabric';

const defaultStyles = {
    heading: { fontSize: 36, fontWeight: '600', fill: '#0f172a' },
    subheading: { fontSize: 22, fontWeight: '600', fill: '#111827' },
    subtext: { fontSize: 16, fontWeight: '400', fill: '#334155' },
    button: { fontSize: 16, fontWeight: '600', fill: '#ffffff', bg: '#4f46e5' },
};

export async function buildFabricFromLayout(layout, originX = 0, originY = 0) {
    const objects = [];
    const spacing = layout.spacing ?? 12;
    let cursorX = originX + (layout.padding?.left ?? 0);
    let cursorY = originY + (layout.padding?.top ?? 0);

    if (layout.type === 'frame') {
        if (Array.isArray(layout.children)) {
            for (const child of layout.children) {
                const childObjs = await buildFabricFromLayout(child, cursorX, cursorY);
                if (Array.isArray(childObjs)) {
                    objects.push(...childObjs);
                    // simple stacking based on layout direction
                    const maxHeight = Math.max(...childObjs.map((o) => o.getScaledHeight?.() || o.height || 0));
                    const maxWidth = Math.max(...childObjs.map((o) => o.getScaledWidth?.() || o.width || 0));
                    if (layout.layout === 'horizontal') {
                        cursorX += maxWidth + spacing;
                    } else {
                        cursorY += maxHeight + spacing;
                    }
                }
            }
        }
        return objects;
    }

    if (layout.type === 'heading' || layout.type === 'subheading' || layout.type === 'subtext') {
        const style = defaultStyles[layout.type] || defaultStyles.subtext;
        const text = new fabric.Textbox(layout.text || 'Text', {
            left: originX,
            top: originY,
            width: layout.width || 420,
            ...style,
        });
        text.name = layout.type;
        return [text];
    }

    if (layout.type === 'button') {
        const style = defaultStyles.button;
        const label = layout.text || 'Button';
        const paddingX = 24;
        const paddingY = 14;
        const text = new fabric.Text(label, {
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            fill: style.fill,
        });
        const rect = new fabric.Rect({
            width: text.width + paddingX * 2,
            height: text.height + paddingY * 2,
            fill: style.bg,
            rx: 10,
            ry: 10,
        });
        const group = new fabric.Group([rect, text], {
            left: originX,
            top: originY,
        });
        text.left = rect.width / 2 - text.width / 2;
        text.top = rect.height / 2 - text.height / 2;
        group.name = 'button';
        return [group];
    }

    if (layout.type === 'image') {
        const src = layout.src || '';
        const width = layout.width || 320;
        const height = layout.height || 220;
        return [
            await new Promise((resolve) => {
                fabric.Image.fromURL(
                    src,
                    (img) => {
                        img.set({
                            left: originX,
                            top: originY,
                            scaleX: width / (img.width || width),
                            scaleY: height / (img.height || height),
                        });
                        img.name = 'image';
                        resolve(img);
                    },
                    { crossOrigin: 'anonymous' }
                );
            }),
        ];
    }

    // Fallback rectangle for unknown types
    const rect = new fabric.Rect({
        left: originX,
        top: originY,
        width: layout.width || 200,
        height: layout.height || 120,
        fill: '#e5e7eb',
        stroke: '#cbd5e1',
    });
    rect.name = layout.type || 'frame';
    return [rect];
}
