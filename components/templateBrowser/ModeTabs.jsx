export default function ModeTabs({ modes, activeMode, onChange }) {
  return (
    <div className="mode-tabs">
      {modes.map((mode) => {
        const isActive = mode.id === activeMode;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`mode-tab ${isActive ? "is-active" : ""}`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
