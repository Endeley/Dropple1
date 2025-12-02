// /convex/mutations/templates.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const createTemplateInstance = mutation({
    args: {
        templateId: v.string(),
        transform: v.object({
            x: v.number(),
            y: v.number(),
            scale: v.number(),
            rotation: v.number(),
        }),
        slots: v.array(
            v.object({
                id: v.string(),
                type: v.string(),
                content: v.any(),
                frame: v.object({
                    x: v.number(),
                    y: v.number(),
                    width: v.number(),
                    height: v.number(),
                }),
            })
        ),
    },

    handler: async (ctx, args) => {
        return ctx.db.insert('templateInstances', {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const updateTemplateInstance = mutation({
    args: {
        id: v.id('templateInstances'),
        patch: v.any(),
    },

    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, {
            ...patch,
            updatedAt: Date.now(),
        });
    },
});

export const deleteTemplateInstance = mutation({
    args: { id: v.id('templateInstances') },

    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});
