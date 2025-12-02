// /convex/mutations/iconPacks.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE ICON PACK */
export const createIconPack = mutation({
    args: {
        name: v.string(),
        style: v.string(),
        preview: v.string(),
        count: v.number(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('iconPacks', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

/* UPDATE ICON PACK */
export const updateIconPack = mutation({
    args: { id: v.id('iconPacks'), patch: v.any() },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, patch);
    },
});

/* DELETE ICON PACK */
export const deleteIconPack = mutation({
    args: { id: v.id('iconPacks') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
