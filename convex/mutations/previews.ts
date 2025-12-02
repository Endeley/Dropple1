// /convex/mutations/previews.ts

import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const saveTemplatePreview = mutation({
    args: {
        templateId: v.string(),
        previewURL: v.string(),
    },
    handler: async (ctx, { templateId, previewURL }) => {
        const defs = await ctx.db
            .query('templateDefinitions')
            .filter((q) => q.eq(q.field('templateId'), templateId))
            .collect();

        if (defs.length > 0) {
            await ctx.db.patch(defs[0]._id, { previewURL });
        }

        const marketplaceEntries = await ctx.db
            .query('marketplaceTemplates')
            .filter((q) => q.eq(q.field('templateId'), templateId))
            .collect();

        for (const entry of marketplaceEntries) {
            await ctx.db.patch(entry._id, { preview: previewURL });
        }
    },
});
