// /convex/queries/templateDefinitions.ts
import { query } from '../_generated/server';
import { v } from 'convex/values';

export const getTemplateDefinition = query({
    args: { templateId: v.string() },
    handler: async (ctx, { templateId }) => {
        const results = await ctx.db
            .query('templateDefinitions')
            .filter((q) => q.eq(q.field('templateId'), templateId))
            .order('desc')
            .collect();

        return results[0] || null;
    },
});

export const listTemplateDefinitions = query({
    handler: async (ctx) => {
        return ctx.db.query('templateDefinitions').collect();
    },
});
