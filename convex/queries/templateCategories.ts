import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST ALL CATEGORIES
export const listCategories = query({
  handler: async (ctx) => {
    return await ctx.db.query("templateCategories").collect();
  },
});

// GET BY ID
export const getCategory = query({
  args: { id: v.id("templateCategories") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// GET BY SLUG
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("templateCategories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});
