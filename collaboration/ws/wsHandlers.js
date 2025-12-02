import { usePresenceStore } from '../presence/usePresenceStore';
import { useCommentsStore } from '../comments/useCommentsStore';
import { WSEvents } from './wsEvents';

export const wsHandlers = (data) => {
    const presence = usePresenceStore.getState();
    const comments = useCommentsStore.getState();

    switch (data.type) {
        case WSEvents.JOIN:
            presence.addUser(data.user);
            break;
        case WSEvents.LEAVE:
            presence.removeUser(data.userId);
            break;
        case WSEvents.PRESENCE:
            presence.updateUser(data.userId, data.patch);
            break;
        case WSEvents.CURSOR:
            presence.updateCursor(data.userId, data.cursor);
            break;
        case WSEvents.SELECTION:
            presence.updateSelection(data.userId, data.selection);
            break;
        case WSEvents.COMMENT_ADD:
            comments.addComment(data.comment);
            break;
        case WSEvents.COMMENT_REPLY:
            comments.replyToComment(data.commentId, data.reply);
            break;
        case WSEvents.COMMENT_RESOLVE:
            comments.resolveComment(data.commentId);
            break;
        default:
            break;
    }
};
