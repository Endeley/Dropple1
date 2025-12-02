import * as fabric from 'fabric';
import { loadSVGIcon } from './loadSVGIcon';
import { createObjectId } from '@/utils/createObjectId';

export const insertAssetIntoCanvas = (canvas, asset, position = {}) => {
    const { type, src, metadata } = asset;

    if (type === 'image') {
        fabric.Image.fromURL(src, (img) => {
            img.__objectId = createObjectId();

            img.set({
                left: position.x || canvas.width / 2 - 100,
                top: position.y || canvas.height / 2 - 100,
                scaleX: 0.5,
                scaleY: 0.5,
                selectable: true,
            });

            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.requestRenderAll();
        });
    }

    if (type === 'icon') {
        return loadSVGIcon(canvas, src, position);
    }

    if (type === 'shape') {
        const shape = new fabric.Rect({
            width: metadata.width || 120,
            height: metadata.height || 120,
            fill: metadata.fill || '#999',
            rx: metadata.rx || 0,
            ry: metadata.ry || 0,
            left: position.x || canvas.width / 2,
            top: position.y || canvas.height / 2,
        });

        shape.__objectId = createObjectId();
        canvas.add(shape);
        canvas.requestRenderAll();
    }
};
