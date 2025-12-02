import { broadcastMessage } from '@/engines/networking/broadcastMessage';
import { generatePatch } from '../crdt/generatePatch';

let lastSnapshot = null;

export const syncCanvas = (canvas) => {
    const current = canvas.toJSON([
        '__objectId',
        '__componentId',
        '__instanceId',
        'layoutProps',
    ]);

    if (!lastSnapshot) {
        lastSnapshot = current;
        return;
    }

    const patch = generatePatch(lastSnapshot, current);

    if (patch.length > 0) {
        broadcastMessage({
            type: 'canvas-update',
            patch,
        });
    }

    lastSnapshot = current;
};
