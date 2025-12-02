import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST MUI PACKS
export const listMuiPacks = query({
  handler: async (ctx) => {
    return await ctx.db.query("muiPacks").collect();
  },
});

// GET PACK
export const getMuiPack = query({
  args: { id: v.id("muiPacks") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});
