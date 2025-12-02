import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const updatePresence = mutation({
    args: {
        documentId: v.id('documents'),
        userId: v.string(),
        tool: v.string(),
        selection: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query('presence')
            .withIndex('by_document', (q) => q.eq('documentId', args.documentId))
            .filter((q) => q.eq(q.field('userId'), args.userId))
            .unique();

        const payload = { ...args, updatedAt: Date.now() };
        if (existing) {
            await ctx.db.patch(existing._id, payload);
        } else {
            await ctx.db.insert('presence', payload);
        }
    },
});
