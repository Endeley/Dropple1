import TemplateCard from "./TemplateCard";

function EmptyState() {
  return (
    <div className="empty-state">
      <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        No results
      </p>
      <p style={{ fontSize: 14, color: "#cbd5e1" }}>
        Try adjusting filters or search to find templates.
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-block skeleton-thumb" />
      <div className="skeleton-block skeleton-line medium" />
      <div className="skeleton-block skeleton-line short" />
      <div className="skeleton-block skeleton-line full" />
    </div>
  );
}

export default function TemplateGrid({
  items,
  mode,
  onPreview,
  makeUseHref,
  loading,
}) {
  return (
    <div className="template-grid wide">
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : !items?.length ? (
        <EmptyState />
      ) : (
        items.map((item) => (
          <TemplateCard
            key={item._id || item.templateId || item.name}
            item={item}
            mode={mode}
            onPreview={onPreview}
            useHref={makeUseHref(item)}
            accent={item.category || item.style || item.difficulty}
          />
        ))
      )}
    </div>
  );
}
