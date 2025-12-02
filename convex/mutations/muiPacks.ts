// /convex/mutations/muiPacks.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE MATERIAL UI PACK */
export const createMuiPack = mutation({
    args: {
        name: v.string(),
        category: v.string(),
        preview: v.string(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('muiPacks', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

/* UPDATE PACK */
export const updateMuiPack = mutation({
    args: { id: v.id('muiPacks'), patch: v.any() },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, patch);
    },
});

/* DELETE PACK */
export const deleteMuiPack = mutation({
    args: { id: v.id('muiPacks') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
