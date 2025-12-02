// /convex/libraries.ts
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const load = query({
    args: { id: v.id('libraries') },
    handler: async ({ db }, { id }) => {
        const lib = await db.get(id);
        if (!lib) return null;
        return lib;
    },
});

export const publishComponent = mutation({
    args: {
        libraryId: v.id('libraries'),
        componentId: v.string(),
        componentData: v.any(),
    },
    handler: async ({ db }, { libraryId, componentId, componentData }) => {
        const lib = await db.get(libraryId);
        if (!lib) throw new Error('Library not found');

        const components = { ...(lib.components || {}) };
        components[componentId] = componentData;

        await db.patch(libraryId, {
            components,
            updatedAt: Date.now(),
        });

        return true;
    },
});

export const bumpVersion = mutation({
    args: {
        id: v.id('libraries'),
        type: v.union(v.literal('major'), v.literal('minor'), v.literal('patch')),
    },
    handler: async ({ db }, { id, type }) => {
        const lib = await db.get(id);
        if (!lib) throw new Error('Library not found');

        const [major, minor, patch] = (lib.version || '0.0.1').split('.').map((num) => parseInt(num, 10) || 0);

        let next = `${major}.${minor}.${patch}`;
        if (type === 'patch') next = `${major}.${minor}.${patch + 1}`;
        if (type === 'minor') next = `${major}.${minor + 1}.0`;
        if (type === 'major') next = `${major + 1}.0.0`;

        await db.patch(id, {
            version: next,
            updatedAt: Date.now(),
        });

        return next;
    },
});

export const installLibrary = mutation({
    args: {
        documentId: v.id('documents'),
        libraryId: v.id('libraries'),
    },
    handler: async ({ db }, { documentId, libraryId }) => {
        const doc = await db.get(documentId);
        if (!doc) throw new Error('Document not found');

        const libs = new Set(doc.data?.installedLibraries || []);
        libs.add(libraryId);

        await db.patch(documentId, {
            data: {
                ...(doc.data || {}),
                installedLibraries: Array.from(libs),
            },
            updatedAt: Date.now(),
        });

        return true;
    },
});
