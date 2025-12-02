'use client';

export default function PreviewModal({ open, item, mode, onClose }) {
  if (!open || !item) return null;

  const preview =
    item.preview || item.svg || (item.definition && item.definition.previewURL);
  const title = item.title || item.name;

  return (
    <div className="preview-backdrop" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-head">
          <div>
            <p className="preview-title">{title}</p>
            <p className="preview-meta">{mode}</p>
          </div>
          <button className="preview-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="preview-body">
          <div className="preview-media">
            {preview ? (
              <img src={preview} alt={title} />
            ) : (
              <div className="preview-text">No preview available</div>
            )}
          </div>
          <div className="preview-info">
            <div>
              <p className="preview-section-title">Category</p>
              <p className="preview-text">{item.category || item.style || "—"}</p>
            </div>
            {item.tags?.length ? (
              <div className="template-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="template-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
            {item.prompt ? (
              <div className="preview-text">
                <p className="preview-section-title">Prompt</p>
                {item.prompt}
              </div>
            ) : null}
            {item.description ? (
              <p className="preview-text">{item.description}</p>
            ) : null}
            {item.author ? (
              <p className="preview-text">By {item.author}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
