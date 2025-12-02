// /convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    /******************************
     * 1. DOCUMENTS (Editor Files)
     ******************************/
    documents: defineTable({
        name: v.string(),
        ownerId: v.optional(v.string()),
        updatedAt: v.number(),
        version: v.optional(v.string()),
        data: v.any(),
    }).index('by_name', ['name']),

    /******************************
     * 2. BRAND KITS
     ******************************/
    brandKits: defineTable({
        name: v.string(),
        ownerId: v.optional(v.string()),
        colors: v.object({
            primary: v.string(),
            secondary: v.string(),
            background: v.string(),
            surface: v.string(),
            textPrimary: v.string(),
            textSecondary: v.string(),
        }),
        fonts: v.object({
            heading: v.string(),
            body: v.string(),
        }),
        assets: v.object({
            logo: v.optional(v.string()),
            icon: v.optional(v.string()),
        }),
        createdAt: v.number(),
        updatedAt: v.number(),
    }),

    /******************************
     * 3. TEMPLATE DEFINITIONS
     ******************************/
    templateDefinitions: defineTable({
        templateId: v.string(),
        definition: v.any(),
        version: v.number(),
        previewURL: v.optional(v.string()),
        createdAt: v.number(),
        updatedAt: v.number(),
    }),

    /******************************
     * 4. TEMPLATE HISTORY (Versioning)
     ******************************/
    templateHistory: defineTable({
        templateId: v.string(),
        version: v.number(),
        snapshot: v.any(),
        meta: v.optional(v.any()),
        createdAt: v.number(),
    }).index('by_template', ['templateId']),

    /******************************
     * 5. TEMPLATE INSTANCES (User-customized)
     ******************************/
    templateInstances: defineTable({
        templateId: v.string(),
        ownerId: v.optional(v.string()),
        transform: v.object({
            x: v.number(),
            y: v.number(),
            scale: v.number(),
            rotation: v.number(),
        }),
        slots: v.array(
            v.object({
                id: v.string(),
                type: v.string(),
                content: v.any(),
                frame: v.object({
                    x: v.number(),
                    y: v.number(),
                    width: v.number(),
                    height: v.number(),
                }),
            })
        ),
        createdAt: v.number(),
        updatedAt: v.number(),
    }),

    /******************************
     * 6. MARKETPLACE TEMPLATES
     ******************************/
    marketplaceTemplates: defineTable({
        templateId: v.string(),
        title: v.string(),
        category: v.string(),
        tags: v.array(v.string()),
        preview: v.optional(v.string()),
        author: v.string(),
        difficulty: v.string(),
        createdAt: v.number(),
    }),

    /******************************
     * 7. TEMPLATE CATEGORIES
     ******************************/
    templateCategories: defineTable({
        name: v.string(),
        slug: v.string(),
        icon: v.optional(v.string()),
        createdAt: v.number(),
    }).index('by_slug', ['slug']),

    /******************************
     * 8. ICON PACKS
     ******************************/
    iconPacks: defineTable({
        name: v.string(),
        style: v.string(), // outline, filled, duotone
        count: v.number(),
        preview: v.string(),
        createdAt: v.number(),
    }),

    /******************************
     * 9. ICONS
     ******************************/
    icons: defineTable({
        packId: v.id('iconPacks'),
        title: v.string(),
        svg: v.string(),
        category: v.string(),
        strokeWidth: v.number(),
        tags: v.array(v.string()),
        createdAt: v.number(),
    }).index('by_pack', ['packId']),

    /******************************
     * 10. MATERIAL UI PACKS
     ******************************/
    muiPacks: defineTable({
        name: v.string(),
        category: v.string(),
        preview: v.string(),
        createdAt: v.number(),
    }),

    /******************************
     * 11. MATERIAL UI COMPONENTS
     ******************************/
    muiComponents: defineTable({
        packId: v.id('muiPacks'),
        title: v.string(),
        props: v.any(),
        code: v.string(),
        preview: v.string(),
        category: v.string(),
    }).index('by_pack', ['packId']),

    /******************************
     * 12. AI STUDIO TEMPLATES
     ******************************/
    aiTemplates: defineTable({
        name: v.string(),
        prompt: v.string(),
        negativePrompt: v.optional(v.string()),
        preview: v.string(),
        tags: v.array(v.string()),
    }),

    /******************************
     * 13. USER PROJECTS (Cross Mode)
     ******************************/
    userProjects: defineTable({
        userId: v.optional(v.string()),
        type: v.string(), // design, image, video, ai, icon…
        data: v.any(),
        preview: v.optional(v.string()),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index('by_user', ['userId']),

    /******************************
     * 14. LIBRARIES (Components)
     ******************************/
    libraries: defineTable({
        name: v.string(),
        ownerId: v.optional(v.string()),
        version: v.string(),
        updatedAt: v.number(),
        components: v.optional(v.any()),
        tokens: v.optional(v.any()),
    })
        .index('by_owner', ['ownerId'])
        .index('by_name', ['name']),

    /******************************
     * 15. ANIMATIONS
     ******************************/
    animations: defineTable({
        canvasId: v.string(),
        objectId: v.string(),
        timeline: v.array(
            v.object({
                property: v.string(),
                time: v.number(),
                value: v.any(),
                easing: v.optional(v.string()),
            })
        ),
        duration: v.number(),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index('by_canvas', ['canvasId']),

    /******************************
     * 16. FONTS (User / Brand)
     ******************************/
    fonts: defineTable({
        name: v.string(),
        family: v.string(),
        variants: v.any(),
        fileURL: v.string(),
        format: v.string(), // ttf, otf, woff2, variable
        createdAt: v.number(),
        ownerId: v.optional(v.string()),
    }).index('by_owner', ['ownerId']),

    /******************************
     * 17. AI GENERATED SECTIONS
     ******************************/
    aiSections: defineTable({
        documentId: v.optional(v.id('documents')),
        mode: v.string(),
        sectionType: v.string(),
        layoutDefinition: v.any(),
        previewURL: v.optional(v.string()),
        createdAt: v.number(),
    }).index('by_doc', ['documentId']),

    /******************************
     * 18. MOCKUPS
     ******************************/
    mockups: defineTable({
        name: v.string(),
        type: v.string(), // shirt, mug, phone, laptop, etc.
        surfaceMap: v.any(), // mesh / perspective data
        maskURL: v.string(),
        backgroundURL: v.string(),
        previewURL: v.optional(v.string()),
        createdAt: v.number(),
    }),

    /******************************
     * 19. TEXT VARIANTS (AI Copy history)
     ******************************/
    textVariants: defineTable({
        layerId: v.string(),
        original: v.string(),
        variants: v.array(v.string()),
        createdAt: v.number(),
    }),

    /******************************
     * 20. COLOR THEMES
     ******************************/
    colorThemes: defineTable({
        documentId: v.id('documents'),
        palette: v.array(v.string()),
        roles: v.object({}),
        createdAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 21. LAYOUT HISTORY (before/after snapshots)
     ******************************/
    layoutHistory: defineTable({
        documentId: v.id('documents'),
        before: v.any(),
        after: v.any(),
        createdAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 22. COLLAB: CURSORS
     ******************************/
    cursors: defineTable({
        documentId: v.id('documents'),
        userId: v.string(),
        x: v.number(),
        y: v.number(),
        color: v.string(),
        name: v.string(),
        updatedAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 23. COLLAB: COMMENTS
     ******************************/
    comments: defineTable({
        documentId: v.id('documents'),
        userId: v.string(),
        threadId: v.optional(v.string()),
        targetObjectId: v.optional(v.string()),
        message: v.string(),
        createdAt: v.number(),
        resolved: v.boolean(),
    }).index('by_document', ['documentId']),

    /******************************
     * 24. COLLAB: PRESENCE
     ******************************/
    presence: defineTable({
        documentId: v.id('documents'),
        userId: v.string(),
        tool: v.string(),
        selection: v.optional(v.string()),
        updatedAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 25. TRANSLATIONS (per text layer)
     ******************************/
    translations: defineTable({
        documentId: v.id('documents'),
        layerId: v.string(),
        original: v.string(),
        translations: v.object({}),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 26. DOCUMENT VERSIONS
     ******************************/
    documentVersions: defineTable({
        documentId: v.id('documents'),
        versionNumber: v.number(),
        label: v.optional(v.string()),
        snapshot: v.any(),
        createdBy: v.string(),
        createdAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 27. MATERIAL EFFECTS (Shadow/Reflection)
     ******************************/
    materialEffects: defineTable({
        documentId: v.id('documents'),
        layerId: v.string(),
        shadow: v.object({
            enabled: v.boolean(),
            angle: v.number(),
            distance: v.number(),
            blur: v.number(),
            opacity: v.number(),
            color: v.string(),
        }),
        reflection: v.object({
            enabled: v.boolean(),
            height: v.number(),
            opacity: v.number(),
            blur: v.number(),
            falloff: v.number(),
        }),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index('by_document', ['documentId']),

    /******************************
     * 28. TEAMS
     ******************************/
    teams: defineTable({
        name: v.string(),
        ownerId: v.string(),
        members: v.array(
            v.object({
                userId: v.string(),
                role: v.string(), // admin, designer, member
            })
        ),
        createdAt: v.number(),
    }),

    /******************************
     * 29. TEAM TEMPLATES
     ******************************/
    teamTemplates: defineTable({
        teamId: v.id('teams'),
        templateId: v.string(),
        title: v.string(),
        category: v.string(),
        previewURL: v.optional(v.string()),
        protectedLayers: v.array(v.string()),
        brandKitId: v.optional(v.id('brandKits')),
        createdBy: v.string(),
        updatedAt: v.number(),
        createdAt: v.number(),
    }).index('by_team', ['teamId']),

    /******************************
     * 30. ASSETS (Uploads / Templates / Brand)
     ******************************/
    assets: defineTable({
        ownerId: v.optional(v.string()),
        src: v.string(),
        kind: v.string(), // image, template, brand, element
        name: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        metadata: v.optional(v.any()),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index('by_owner', ['ownerId'])
        .index('by_kind', ['kind']),
});
