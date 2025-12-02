// /convex/mutations/templateCategories.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE CATEGORY */
export const createCategory = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        icon: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('templateCategories', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

/* UPDATE CATEGORY */
export const updateCategory = mutation({
    args: {
        id: v.id('templateCategories'),
        patch: v.any(),
    },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, patch);
    },
});

/* DELETE CATEGORY */
export const deleteCategory = mutation({
    args: { id: v.id('templateCategories') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
