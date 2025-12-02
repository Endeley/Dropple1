export const templateDefinitionsSeed = [
  {
    templateId: "tpl-flyer-001",
    version: 1,
    definition: {
      title: "Summer Sale Flyer",
      size: "A4",
      theme: "bright",
      layers: [
        { type: "background", color: "#f8fafc" },
        { type: "text", role: "headline", value: "Big Summer Savings", x: 60, y: 80 },
        { type: "text", role: "cta", value: "Shop Now", x: 60, y: 320 },
        { type: "shape", role: "accent", variant: "wave", color: "#2563eb" },
      ],
    },
  },
  {
    templateId: "tpl-poster-001",
    version: 1,
    definition: {
      title: "Product Launch Poster",
      size: "1080x1350",
      theme: "dark",
      layers: [
        { type: "background", gradient: ["#0b1221", "#111827"] },
        { type: "text", role: "headline", value: "Introducing Nova", x: 80, y: 120 },
        { type: "text", role: "subhead", value: "Fast. Bold. Reliable.", x: 80, y: 220 },
        { type: "shape", role: "badge", variant: "pill", color: "#22d3ee" },
      ],
    },
  },
];

export const templateHistorySeed = [
  {
    templateId: "tpl-flyer-001",
    snapshot: {
      note: "Initial flyer layout",
      version: 1,
    },
    meta: { createdBy: "seed" },
  },
  {
    templateId: "tpl-poster-001",
    snapshot: {
      note: "Initial poster layout",
      version: 1,
    },
    meta: { createdBy: "seed" },
  },
];

export const marketplaceTemplatesSeed = [
  {
    templateId: "tpl-flyer-001",
    title: "Summer Sale Flyer",
    category: "flyer",
    tags: ["sale", "retail", "promo"],
    preview: "/seed/templates/flyer.png",
    author: "Dropple Studio",
    difficulty: "easy",
  },
  {
    templateId: "tpl-poster-001",
    title: "Product Launch Poster",
    category: "poster",
    tags: ["launch", "poster", "event"],
    preview: "/seed/templates/poster.png",
    author: "Dropple Studio",
    difficulty: "medium",
  },
];

export const templateInstancesSeed = [
  {
    templateId: "tpl-flyer-001",
    transform: { x: 0, y: 0, scale: 1, rotation: 0 },
    slots: [
      {
        id: "headline",
        type: "text",
        content: "Big Summer Savings",
        frame: { x: 60, y: 80, width: 420, height: 80 },
      },
      {
        id: "cta",
        type: "text",
        content: "Shop Now",
        frame: { x: 60, y: 320, width: 240, height: 60 },
      },
    ],
  },
  {
    templateId: "tpl-poster-001",
    transform: { x: 0, y: 0, scale: 1, rotation: 0 },
    slots: [
      {
        id: "headline",
        type: "text",
        content: "Introducing Nova",
        frame: { x: 80, y: 120, width: 520, height: 90 },
      },
      {
        id: "subhead",
        type: "text",
        content: "Fast. Bold. Reliable.",
        frame: { x: 80, y: 220, width: 520, height: 70 },
      },
    ],
  },
];
