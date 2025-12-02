import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST AI TEMPLATES
export const listAiTemplates = query({
  handler: async (ctx) => {
    return await ctx.db.query("aiTemplates").collect();
  },
});

// GET AI TEMPLATE
export const getAiTemplate = query({
  args: { id: v.id("aiTemplates") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// SEARCH AI TEMPLATES
export const searchAiTemplates = query({
  args: { term: v.string() },
  handler: async (ctx, { term }) => {
    const lower = term.toLowerCase();
    const results = await ctx.db.query("aiTemplates").collect();

    return results.filter(
      (t) =>
        t.name.toLowerCase().includes(lower) ||
        t.tags.some((tag) => tag.toLowerCase().includes(lower))
    );
  },
});
