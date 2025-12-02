import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const publishTeamTemplate = mutation({
    args: {
        teamId: v.id('teams'),
        templateId: v.string(),
        title: v.string(),
        category: v.string(),
        previewURL: v.string(),
        protectedLayers: v.array(v.string()),
        brandKitId: v.optional(v.id('brandKits')),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('teamTemplates', {
            ...args,
            updatedAt: Date.now(),
            createdAt: Date.now(),
        });
    },
});

export const updateTeamTemplate = mutation({
    args: {
        id: v.id('teamTemplates'),
        patch: v.any(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { ...args.patch, updatedAt: Date.now() });
    },
});

export const deleteTeamTemplate = mutation({
    args: { id: v.id('teamTemplates') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
