import { query } from '../_generated/server';
import { v } from 'convex/values';

export const listVersions = query({
    args: { documentId: v.id('documents') },
    handler: async ({ db }, { documentId }) =>
        db.query('documentVersions').withIndex('by_document', (q) => q.eq('documentId', documentId)).order('desc').collect(),
});
