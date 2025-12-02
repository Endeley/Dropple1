function TagPill({ tag, active, onToggle }) {
  return (
    <button
      onClick={() => onToggle(tag)}
      className={`tag-pill ${active ? "is-active" : ""}`}
    >
      #{tag}
    </button>
  );
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  availableTags,
  selectedTags,
  onToggleTag,
  onClearTags,
}) {
  return (
    <aside className="template-sidebar">
      <div>
        <h3>Categories</h3>
        <div className="sidebar-buttons">
          <button
            onClick={() => onSelectCategory(null)}
            className={`sidebar-btn ${!selectedCategory ? "is-active" : ""}`}
          >
            All templates
          </button>
          {(categories || []).map((cat) => {
            const active = selectedCategory?.slug === cat.slug;
            return (
              <button
                key={cat._id}
                onClick={() => onSelectCategory(cat)}
                className={`sidebar-btn ${active ? "is-active" : ""}`}
              >
                <span>{cat.icon || "•"}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {availableTags?.length ? (
        <div className="tags-section">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ margin: 0 }}>Tags</h3>
            {selectedTags.length > 0 && (
              <button onClick={onClearTags} className="tag-clear">
                Clear
              </button>
            )}
          </div>
          <div className="tag-pills">
            {availableTags.map((tag) => (
              <TagPill
                key={tag}
                tag={tag}
                active={selectedTags.includes(tag)}
                onToggle={onToggleTag}
              />
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
