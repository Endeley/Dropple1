import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST ALL ICON PACKS
export const listIconPacks = query({
  handler: async (ctx) => {
    return await ctx.db.query("iconPacks").order("desc").collect();
  },
});

// GET SINGLE PACK
export const getIconPack = query({
  args: { id: v.id("iconPacks") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
