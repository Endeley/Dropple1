import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const addComment = mutation({
    args: {
        documentId: v.id('documents'),
        userId: v.string(),
        message: v.string(),
        threadId: v.optional(v.string()),
        targetObjectId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('comments', {
            ...args,
            resolved: false,
            createdAt: Date.now(),
        });
    },
});
