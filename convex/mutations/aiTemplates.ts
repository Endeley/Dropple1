// /convex/mutations/aiTemplates.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE AI TEMPLATE */
export const createAiTemplate = mutation({
    args: {
        name: v.string(),
        prompt: v.string(),
        negativePrompt: v.optional(v.string()),
        preview: v.string(),
        tags: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('aiTemplates', args);
    },
});

/* UPDATE AI TEMPLATE */
export const updateAiTemplate = mutation({
    args: { id: v.id('aiTemplates'), patch: v.any() },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, patch);
    },
});

/* DELETE AI TEMPLATE */
export const deleteAiTemplate = mutation({
    args: { id: v.id('aiTemplates') },
    handler: async (ctx, { id }) => ctx.db.delete(id),
});
