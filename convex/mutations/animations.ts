import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const saveAnimation = mutation({
    args: {
        canvasId: v.string(),
        objectId: v.string(),
        timeline: v.any(),
        duration: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('animations', {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});
