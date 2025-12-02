'use client';

import Link from "next/link";

function FallbackVisual({ title }) {
  return (
    <div className="template-fallback">
      {title?.slice(0, 1) || "T"}
    </div>
  );
}

export default function TemplateCard({
  item,
  mode,
  onPreview,
  useHref,
  accent,
}) {
  const tags = item.tags || [];
  const preview = item.preview;

  return (
    <div className="template-card">
      <div className="template-thumb">
        {preview ? (
          <img
            src={preview}
            alt={item.title || item.name}
            loading="lazy"
          />
        ) : (
          <FallbackVisual title={item.title || item.name} />
        )}
      </div>

      <div className="template-info">
        <div className="template-title-line">
          <p className="template-name">{item.title || item.name}</p>
          {accent ? <span className="template-accent">{accent}</span> : null}
        </div>
        {item.subtitle ? <p className="template-subtitle">{item.subtitle}</p> : null}
      </div>

      {tags?.length ? (
        <div className="template-tags">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="template-tag">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="template-actions">
        <button
          onClick={() => onPreview(item, mode)}
          className="btn"
        >
          Preview
        </button>
        <Link
          href={useHref}
          className="btn primary"
        >
          Use
        </Link>
      </div>
    </div>
  );
}
