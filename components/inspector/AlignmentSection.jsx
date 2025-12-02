'use client';

export function AlignmentSection({ textObject }) {
  const align = textObject?.props?.align || "left";

  const updateAlign = (value) => {
    if (!textObject) return;
    if (typeof textObject.updateProps === "function") {
      textObject.updateProps({ align: value });
    } else if (textObject.props) {
      textObject.props.align = value;
      if (typeof textObject.markDirty === "function") textObject.markDirty("layout");
    }
  };

  const btn = "px-2 py-1 rounded border text-xs font-semibold";

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Alignment</h3>
      <div className="flex gap-2">
        {["left", "center", "right", "justify"].map((a) => (
          <button
            key={a}
            onClick={() => updateAlign(a)}
            className={`${btn} ${align === a ? "bg-gray-200 dark:bg-gray-800" : "bg-transparent"}`}
          >
            {a[0].toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
