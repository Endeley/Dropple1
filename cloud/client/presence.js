import { usePresenceStore } from '../store/usePresenceStore';

let presenceSocket = null;

export const initPresence = (projectId, user) => {
    if (presenceSocket) return presenceSocket;
    presenceSocket = new WebSocket(`wss://dropple.com/presence/${projectId}`);

    presenceSocket.onopen = () => {
        presenceSocket.send(
            JSON.stringify({ type: 'join', user: { id: user.id, name: user.name, avatar: user.avatar } })
        );
    };

    presenceSocket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const store = usePresenceStore.getState();
            if (data.type === 'cursor') {
                store.updateCursor(data.userId, data.position);
            }
            if (data.type === 'user') {
                store.updateUser(data.user.id, data.user);
            }
            if (data.type === 'leave') {
                store.removeUser(data.userId);
            }
        } catch (err) {
            console.error('presence parse error', err);
        }
    };

    return presenceSocket;
};

export const sendCursor = (position) => {
    presenceSocket?.send(JSON.stringify({ type: 'cursor', position }));
};
