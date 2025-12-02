export function explore({ tags = [], creators = [] } = {}) {
  return {
    tags,
    creators,
    suggestions: [...tags, ...creators].slice(0, 5),
  };
}
