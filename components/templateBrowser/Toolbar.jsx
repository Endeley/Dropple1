export default function Toolbar({
  search,
  onSearchChange,
  total,
  modeLabel,
}) {
  return (
    <div className="template-toolbar">
      <div className="template-toolbar-row">
        <div className="search-box">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="search-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="6" />
            <line x1="15.5" y1="15.5" x2="21" y2="21" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search templates, tags, authors..."
            type="search"
          />
        </div>
        <div className="toolbar-meta">{modeLabel}</div>
      </div>
      <div className="toolbar-results">
        Showing <span style={{ color: "#fff", fontWeight: 700 }}>{total}</span>{" "}
        results
      </div>
    </div>
  );
}
