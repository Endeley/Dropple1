import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const updateCursor = mutation({
    args: {
        documentId: v.id('documents'),
        userId: v.string(),
        x: v.number(),
        y: v.number(),
        name: v.string(),
        color: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query('cursors')
            .withIndex('by_document', (q) => q.eq('documentId', args.documentId))
            .filter((q) => q.eq(q.field('userId'), args.userId))
            .unique();

        const payload = { ...args, updatedAt: Date.now() };

        if (existing) {
            await ctx.db.patch(existing._id, payload);
        } else {
            await ctx.db.insert('cursors', payload);
        }
    },
});
