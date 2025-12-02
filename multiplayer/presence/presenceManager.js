import { broadcastMessage } from '@/engines/networking/broadcastMessage';

let interval = null;

export const joinPresence = (user) => {
    broadcastMessage({
        type: 'presence-join',
        user,
    });

    interval = setInterval(() => {
        broadcastMessage({
            type: 'presence-heartbeat',
            userId: user.id,
        });
    }, 3000);
};

export const leavePresence = (userId) => {
    broadcastMessage({
        type: 'presence-leave',
        userId,
    });

    if (interval) clearInterval(interval);
};
