// /convex/queries/templates.ts
import { query } from '../_generated/server';

export const listTemplateInstances = query({
    handler: async (ctx) => {
        return ctx.db.query('templateInstances').collect();
    },
});
