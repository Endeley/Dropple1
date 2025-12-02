import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST ALL COMPONENTS
export const listMuiComponents = query({
  handler: async (ctx) => {
    return await ctx.db.query("muiComponents").collect();
  },
});

// GET BY ID
export const getMuiComponent = query({
  args: { id: v.id("muiComponents") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// GET COMPONENTS BY PACK
export const getComponentsByPack = query({
  args: { packId: v.id("muiPacks") },
  handler: async (ctx, { packId }) => {
    return await ctx.db
      .query("muiComponents")
      .withIndex("by_pack", (q) => q.eq("packId", packId))
      .collect();
  },
});

// SEARCH COMPONENTS
export const searchMuiComponents = query({
  args: { term: v.string() },
  handler: async (ctx, { term }) => {
    const lower = term.toLowerCase();

    return await ctx.db
      .query("muiComponents")
      .collect()
      .then((components) =>
        components.filter(
          (c) =>
            c.title.toLowerCase().includes(lower) ||
            c.category.toLowerCase().includes(lower)
        )
      );
  },
});
