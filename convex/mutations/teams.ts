import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const createTeam = mutation({
    args: {
        name: v.string(),
        ownerId: v.string(),
    },
    handler: async (ctx, { name, ownerId }) => {
        return ctx.db.insert('teams', {
            name,
            ownerId,
            members: [{ userId: ownerId, role: 'admin' }],
            createdAt: Date.now(),
        });
    },
});
