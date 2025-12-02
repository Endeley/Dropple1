// /convex/mutations/icons.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE ICON */
export const createIcon = mutation({
    args: {
        packId: v.id('iconPacks'),
        title: v.string(),
        svg: v.string(),
        category: v.string(),
        strokeWidth: v.number(),
        tags: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('icons', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

/* UPDATE ICON */
export const updateIcon = mutation({
    args: { id: v.id('icons'), patch: v.any() },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, patch);
    },
});

/* DELETE ICON */
export const deleteIcon = mutation({
    args: { id: v.id('icons') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
