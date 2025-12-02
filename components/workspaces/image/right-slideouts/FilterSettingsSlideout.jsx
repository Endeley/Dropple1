import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";

export default function FilterSettingsSlideout() {
    const activeRight = useWorkspaceUIStore((s) => s.activeRightSlideout);
    const closeRight = useWorkspaceUIStore((s) => s.closeRight);

    if (activeRight !== "filterSettings") return null;

    return (
        <div className="nw-slideout-content">
            <div className="nw-slideout-header">
                <h2 className="nw-slideout-title">Filter Settings</h2>
                <button className="nw-slideout-close" onClick={closeRight}>
                    ×
                </button>
            </div>

            <div className="nw-control-group">
                <div className="nw-field">
                    <label>Intensity</label>
                    <input type="range" min="0" max="100" className="nw-slider" />
                </div>

                <div className="nw-field">
                    <label>Fade</label>
                    <input type="range" min="0" max="100" className="nw-slider" />
                </div>

                <div className="nw-field">
                    <label>Tint</label>
                    <input type="color" className="nw-color-input" />
                </div>
            </div>
        </div>
    );
}
