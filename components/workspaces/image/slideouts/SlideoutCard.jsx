"use client";

export default function SlideoutCard({ title, action, onClose, width = "slideout-sm", children }) {
  return (
    <div className={`slideout-card ${width}`}>
      <div className="slideout-card__header">
        <span className="slideout-card__title">{title}</span>
        <div className="slideout-card__actions">
          {action}
          <button type="button" onClick={onClose} className="btn-ghost-xs">
            Close
          </button>
        </div>
      </div>
      <div className="slideout-card__body">{children}</div>
    </div>
  );
}
