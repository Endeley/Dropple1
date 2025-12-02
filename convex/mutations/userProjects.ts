// /convex/mutations/userProjects.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/* CREATE PROJECT */
export const createProject = mutation({
    args: {
        userId: v.optional(v.string()),
        type: v.string(),
        data: v.any(),
        preview: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert('userProjects', {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

/* UPDATE PROJECT */
export const updateProject = mutation({
    args: { id: v.id('userProjects'), patch: v.any() },
    handler: async (ctx, { id, patch }) => {
        await ctx.db.patch(id, {
            ...patch,
            updatedAt: Date.now(),
        });
    },
});

/* DELETE PROJECT */
export const deleteProject = mutation({
    args: { id: v.id('userProjects') },
    handler: async (ctx, { id }) => ctx.db.delete(id),
});
