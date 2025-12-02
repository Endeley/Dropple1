let socket = null;

export const initRealtime = (projectId, token) => {
    if (socket) return socket;
    socket = new WebSocket(`wss://dropple.com/realtime/${projectId}?token=${token || ''}`);
    socket.onopen = () => console.log('[realtime] connected');
    socket.onclose = () => console.log('[realtime] disconnected');
    socket.onerror = (err) => console.error('[realtime] error', err);
    return socket;
};

export const sendOperation = (operation) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify({ type: 'op', payload: operation }));
};

export const subscribeRealtime = (handler) => {
    if (!socket) return () => {};
    const listener = (event) => {
        try {
            const data = JSON.parse(event.data);
            handler?.(data);
        } catch (err) {
            console.error('Failed to parse realtime payload', err);
        }
    };
    socket.addEventListener('message', listener);
    return () => socket.removeEventListener('message', listener);
};
