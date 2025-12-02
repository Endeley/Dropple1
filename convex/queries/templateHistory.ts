// /convex/queries/templateHistory.ts
import { query } from '../_generated/server';
import { v } from 'convex/values';

export const listVersions = query({
    args: { templateId: v.string() },
    handler: async (ctx, { templateId }) => {
        return ctx.db
            .query('templateHistory')
            .withIndex('by_template', (q) => q.eq('templateId', templateId))
            .order('desc')
            .collect();
    },
});
