const posts = [];

export function publishPost(post) {
  const full = { ...post, id: `post_${Math.random().toString(36).slice(2, 8)}`, createdAt: Date.now() };
  posts.push(full);
  return full;
}

export function listPosts() {
  return posts;
}
