// /convex/documents.ts
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const EMPTY_DOCUMENT_DATA = {
    id: '',
    name: 'Untitled Document',
    pages: [],
    layers: {},
    rootLayerIds: [],
    componentMasters: {},
    componentVariants: {},
    componentInstances: {},
    componentThumbnails: {},
    templates: {},
    templateInstances: {},
    assets: {},
    installedLibraries: [],
    settings: {
        canvasZoom: 1,
        canvasPan: { x: 0, y: 0 },
    },
    version: '1.0.0',
};

export const all = query({
    args: {},
    handler: async ({ db }) => {
        return await db.query('documents').collect();
    },
});

export const load = query({
    args: { id: v.id('documents') },
    handler: async ({ db }, { id }) => {
        return await db.get(id);
    },
});

export const create = mutation({
    args: {
        name: v.optional(v.string()),
    },
    handler: async ({ db }, { name }) => {
        const now = Date.now();
        const docName = name || 'Untitled Document';
        const initialData = { ...EMPTY_DOCUMENT_DATA, name: docName };

        const id = await db.insert('documents', {
            name: docName,
            ownerId: undefined,
            updatedAt: now,
            version: '1.0.0',
            data: initialData,
        });

        await db.patch(id, {
            data: { ...initialData, id },
        });

        return id;
    },
});

export const save = mutation({
    args: {
        id: v.id('documents'),
        data: v.any(),
    },
    handler: async ({ db }, { id, data }) => {
        await db.patch(id, {
            data,
            updatedAt: Date.now(),
        });
        return true;
    },
});
