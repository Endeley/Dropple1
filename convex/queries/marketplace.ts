// /convex/queries/marketplace.ts
import { query } from "../_generated/server";
import { v } from "convex/values";

export const listMarketplaceTemplates = query({
  handler: async (ctx) => {
    return ctx.db.query("marketplaceTemplates").order("desc").collect();
  },
});

export const browserTemplates = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    page: v.optional(v.number()),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const page = Math.max(1, args.page ?? 1);
    const pageSize = Math.max(1, Math.min(36, args.pageSize ?? 12));

    const all = await ctx.db
      .query("marketplaceTemplates")
      .order("desc")
      .collect();

    const searchTerm = (args.search || "").trim().toLowerCase();
    const tags = args.tags?.map((t) => t.toLowerCase()) ?? [];

    let filtered = all;
    if (args.category) {
      filtered = filtered.filter((t) => t.category === args.category);
    }
    if (tags.length) {
      filtered = filtered.filter((t) => {
        const templateTags = (t.tags || []).map((tag) => tag.toLowerCase());
        return tags.every((tag) => templateTags.includes(tag));
      });
    }
    if (searchTerm) {
      filtered = filtered.filter((t) => {
        const haystack = [
          t.title,
          t.category,
          t.author,
          ...(t.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(searchTerm);
      });
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    const availableTags = Array.from(
      new Set(
        filtered.flatMap((t) =>
          (t.tags || []).map((tag) => tag.toString().toLowerCase())
        )
      )
    );

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
      tags: availableTags,
    };
  },
});
