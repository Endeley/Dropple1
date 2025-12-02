import { wsHandlers } from './wsHandlers';

export const initWS = (projectId, user) => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + `/collab/${projectId}`);

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'join', user }));
    };

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        wsHandlers(data);
    };

    ws.onclose = () => {
        console.warn('WebSocket closed');
    };

    return ws;
};
