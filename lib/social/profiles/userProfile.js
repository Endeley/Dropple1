export function createProfile({ id, name, bio = "", links = [] }) {
  return {
    id,
    name,
    bio,
    links,
    banner: null,
    badges: [],
    stats: { followers: 0, following: 0, posts: 0 },
  };
}
