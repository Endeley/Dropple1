// /convex/mutations/brandkits.ts

import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const createBrandKit = mutation({
    args: {
        name: v.string(),
        colors: v.any(),
        fonts: v.any(),
        assets: v.any(),
    },

    handler: async (ctx, args) => {
        return ctx.db.insert('brandKits', {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const updateBrandKit = mutation({
    args: {
        id: v.id('brandKits'),
        patch: v.any(),
    },

    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, {
            ...patch,
            updatedAt: Date.now(),
        });
    },
});

export const deleteBrandKit = mutation({
    args: {
        id: v.id('brandKits'),
    },

    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
