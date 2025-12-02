"use client";

import { useState } from "react";
import { publishPost, listPosts } from "@/lib/social/content/postManager";
import { createTemplatePost } from "@/lib/social/content/templatePosts";
import { buildFeed } from "@/lib/social/feed/feedBuilder";
import { rankTrending } from "@/lib/social/feed/trendingRanker";
import { addComment, listComments } from "@/lib/social/interactions/comments";
import { react, getReactions } from "@/lib/social/interactions/reactions";
import { addRemix, getRemixTree } from "@/lib/social/graph/remixGraph";

export default function SocialPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const post = publishPost(createTemplatePost("template_123", { title: "Neon Poster" }));
    react(post.id, "user_1", "like");
    addComment(post.id, "user_2", "Love this!");
    addRemix(post.id, "remix_1");
    const feed = buildFeed({ type: "for_you", posts: listPosts() });
    const trending = rankTrending(feed.posts);
    const tree = getRemixTree(post.id);
    const comments = listComments(post.id);
    const reactions = getReactions(post.id);

    setLog((l) => [
      ...l,
      `Post: ${post.id}`,
      `Feed size: ${feed.posts.length}`,
      `Trending top: ${trending[0]?.id || "none"}`,
      `Comments: ${comments.length}`,
      `Reactions: ${reactions.length}`,
      `Remix children: ${tree.children.length}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Social Engine</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
