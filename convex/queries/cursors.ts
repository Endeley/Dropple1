import { query } from '../_generated/server';
import { v } from 'convex/values';

export const getDocumentCursors = query({
    args: { documentId: v.id('documents') },
    handler: async ({ db }, { documentId }) =>
        db.query('cursors').withIndex('by_document', (q) => q.eq('documentId', documentId)).collect(),
});
