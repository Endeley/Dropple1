import { broadcastMessage } from '@/engines/networking/broadcastMessage';

export const broadcastCursor = (userId, position) => {
    broadcastMessage({
        type: 'cursor-move',
        userId,
        position,
    });
};
