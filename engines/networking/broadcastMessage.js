import { send } from './wsClient';

export const broadcastMessage = (data) => {
    send(data);
};
