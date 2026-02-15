import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all memos for a user
export const byUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("memos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get recent memos
export const recent = query({
  args: { userId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const memos = await ctx.db
      .query("memos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    return memos
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, args.limit || 10);
  },
});

// Create a memo
export const create = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    command: v.string(),
    title: v.optional(v.string()),
    content: v.string(),
    metadata: v.optional(v.object()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("memos", {
      ...args,
      createdAt: Date.now(),
    });
    
    // Generate URL (in production, this would be a proper domain)
    await ctx.db.patch(id, {
      url: `https://tawkie.dev/memo/${id}`,
    });
    
    return id;
  },
});

// Delete a memo
export const remove = mutation({
  args: { id: v.id("memos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Get memo by ID
export const getById = query({
  args: { id: v.id("memos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get memos by date range
export const byDateRange = query({
  args: {
    userId: v.string(),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, args) => {
    const memos = await ctx.db
      .query("memos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    return memos.filter(
      (m) => m.createdAt >= args.startTime && m.createdAt <= args.endTime
    );
  },
});
