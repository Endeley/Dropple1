import { mutation } from '../_generated/server';
import { v } from 'convex/values';

// Minimal create mutation for AI generated sections.
export const createAISection = mutation({
    args: {
        sectionType: v.string(),
        mode: v.string(),
        layoutDefinition: v.any(),
        previewURL: v.optional(v.string()),
        documentId: v.optional(v.id('documents')),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('aiSections', {
            ...args,
            createdAt: Date.now(),
        });
    },
});
