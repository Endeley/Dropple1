// /convex/mutations/templateHistory.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const saveVersion = mutation({
    args: {
        templateId: v.string(),
        snapshot: v.any(),
        meta: v.optional(v.any()),
    },
    handler: async (ctx, { templateId, snapshot, meta }) => {
        const versions = await ctx.db
            .query('templateHistory')
            .withIndex('by_template', (q) => q.eq('templateId', templateId))
            .order('desc')
            .collect();

        const latest = versions[0];
        const nextVersion = latest ? (latest.version || 0) + 1 : 1;

        await ctx.db.insert('templateHistory', {
            templateId,
            version: nextVersion,
            snapshot,
            meta: meta || {},
            createdAt: Date.now(),
        });

        return nextVersion;
    },
});
