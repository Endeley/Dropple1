import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const createMockup = mutation({
    args: {
        name: v.string(),
        type: v.string(),
        surfaceMap: v.any(),
        maskURL: v.string(),
        backgroundURL: v.string(),
        previewURL: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('mockups', {
            ...args,
            createdAt: Date.now(),
        });
    },
});
