import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const uploadFont = mutation({
    args: {
        name: v.string(),
        family: v.string(),
        variants: v.any(),
        fileURL: v.string(),
        format: v.string(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('fonts', {
            ...args,
            createdAt: Date.now(),
        });
    },
});
