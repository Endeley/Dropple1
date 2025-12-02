// /convex/mutations/muiComponents.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE COMPONENT */
export const createMuiComponent = mutation({
    args: {
        packId: v.id('muiPacks'),
        title: v.string(),
        props: v.any(),
        code: v.string(),
        preview: v.string(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('muiComponents', args);
    },
});

/* UPDATE COMPONENT */
export const updateMuiComponent = mutation({
    args: { id: v.id('muiComponents'), patch: v.any() },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, patch);
    },
});

/* DELETE COMPONENT */
export const deleteMuiComponent = mutation({
    args: { id: v.id('muiComponents') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
