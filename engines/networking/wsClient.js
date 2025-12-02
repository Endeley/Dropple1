let socket = null;
let handlers = [];

export const initWSClient = (url) => {
    socket = new WebSocket(url);

    socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        handlers.forEach((h) => h(data));
    };
};

export const onMessage = (handler) => {
    handlers.push(handler);
};

export const send = (data) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(data));
};
