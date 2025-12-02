import { query } from '../_generated/server';
import { v } from 'convex/values';

export const listAssets = query({
  args: {
    ownerId: v.optional(v.string()),
    kind: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query('assets');
    if (args.ownerId) {
      q = q.withIndex('by_owner', (q) => q.eq('ownerId', args.ownerId));
    }
    if (args.kind) {
      q = q.withIndex('by_kind', (q) => q.eq('kind', args.kind));
    }
    return await q.collect();
  },
});
