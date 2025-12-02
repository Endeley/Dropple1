// /convex/mutations/templateDefinitions.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const publishTemplateDefinition = mutation({
    args: {
        templateId: v.string(),
        definition: v.any(),
        version: v.number(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('templateDefinitions', {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const updateTemplateDefinition = mutation({
    args: {
        id: v.id('templateDefinitions'),
        patch: v.any(),
    },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, {
            ...patch,
            updatedAt: Date.now(),
        });
    },
});

export const deleteTemplateDefinition = mutation({
    args: { id: v.id('templateDefinitions') },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
