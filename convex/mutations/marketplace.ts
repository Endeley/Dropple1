// /convex/mutations/marketplace.ts

import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const publishTemplate = mutation({
    args: {
        templateId: v.string(),
        title: v.string(),
        category: v.string(),
        tags: v.array(v.string()),
        preview: v.string(),
        author: v.string(),
        difficulty: v.string(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('marketplaceTemplates', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const unpublishTemplate = mutation({
    args: { id: v.id('marketplaceTemplates') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});

export const updateTemplateMetadata = mutation({
    args: {
        templateId: v.string(),
        patch: v.any(),
    },
    handler: async (ctx, { templateId, patch }) => {
        const matches = await ctx.db
            .query('marketplaceTemplates')
            .filter((q) => q.eq(q.field('templateId'), templateId))
            .collect();

        await Promise.all(matches.map((entry) => ctx.db.patch(entry._id, patch)));
    },
});
