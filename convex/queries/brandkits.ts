// /convex/queries/brandkits.ts
import { query } from '../_generated/server';

export const listBrandKits = query({
    handler: async (ctx) => {
        return ctx.db.query('brandKits').collect();
    },
});
