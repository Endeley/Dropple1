import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST ALL ICONS
export const listIcons = query({
  handler: async (ctx) => {
    return await ctx.db.query("icons").collect();
  },
});

// GET ICON BY ID
export const getIcon = query({
  args: { id: v.id("icons") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// GET ICONS BY PACK
export const getIconsByPack = query({
  args: { packId: v.id("iconPacks") },
  handler: async (ctx, { packId }) => {
    return await ctx.db
      .query("icons")
      .withIndex("by_pack", (q) => q.eq("packId", packId))
      .collect();
  },
});

// SEARCH ICONS
export const searchIcons = query({
  args: { term: v.string() },
  handler: async (ctx, { term }) => {
    const lower = term.toLowerCase();

    return await ctx.db
      .query("icons")
      .collect()
      .then((icons) =>
        icons.filter(
          (i) =>
            i.title.toLowerCase().includes(lower) ||
            i.tags.some((t) => t.toLowerCase().includes(lower))
        )
      );
  },
});
