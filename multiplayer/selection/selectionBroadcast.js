import { broadcastMessage } from '@/engines/networking/broadcastMessage';

export const broadcastSelection = (userId, objectIds) => {
    broadcastMessage({
        type: 'selection-update',
        userId,
        objectIds,
    });
};
