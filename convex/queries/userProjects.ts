import { query } from "../_generated/server";
import { v } from "convex/values";

// LIST ALL PROJECTS
export const listProjects = query({
  handler: async (ctx) => ctx.db.query("userProjects").collect(),
});

// GET BY ID
export const getProject = query({
  args: { id: v.id("userProjects") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// GET BY USER
export const getProjectsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("userProjects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

// GET BY TYPE (design, video, ai, icon, etc.)
export const getProjectsByType = query({
  args: { type: v.string() },
  handler: async (ctx, { type }) => {
    const all = await ctx.db.query("userProjects").collect();
    return all.filter((p) => p.type === type);
  },
});
