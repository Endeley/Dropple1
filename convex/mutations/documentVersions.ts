import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const saveVersion = mutation({
    args: {
        documentId: v.id('documents'),
        snapshot: v.any(),
        label: v.optional(v.string()),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const versions = await ctx.db
            .query('documentVersions')
            .withIndex('by_document', (q) => q.eq('documentId', args.documentId))
            .order('desc')
            .collect();

        const nextVersion = versions[0] ? versions[0].versionNumber + 1 : 1;

        await ctx.db.insert('documentVersions', {
            documentId: args.documentId,
            versionNumber: nextVersion,
            label: args.label || null,
            snapshot: args.snapshot,
            createdBy: args.createdBy,
            createdAt: Date.now(),
        });

        return nextVersion;
    },
});
