import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const saveAssets = mutation({
  args: {
    assets: v.array(
      v.object({
        id: v.optional(v.string()),
        ownerId: v.optional(v.string()),
        src: v.string(),
        kind: v.string(),
        name: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        metadata: v.optional(v.any()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    // Replace strategy: clear and insert all
    // In a real app, you might upsert per id/owner.
    const existing = await ctx.db.query('assets').collect();
    await Promise.all(existing.map((doc) => ctx.db.delete(doc._id)));

    const inserted = [];
    for (const asset of args.assets) {
      const doc = await ctx.db.insert('assets', {
        ownerId: asset.ownerId || null,
        src: asset.src,
        kind: asset.kind || 'image',
        name: asset.name || null,
        tags: asset.tags || [],
        metadata: asset.metadata || {},
        createdAt: now,
        updatedAt: now,
      });
      inserted.push(doc);
    }
    return inserted;
  },
});
