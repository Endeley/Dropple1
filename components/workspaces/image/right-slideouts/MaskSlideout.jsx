import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";

export default function MaskSlideout() {
    const activeRight = useWorkspaceUIStore((s) => s.activeRightSlideout);
    const closeRight = useWorkspaceUIStore((s) => s.closeRight);

    if (activeRight !== "mask") return null;

    return (
        <div className="nw-slideout-content">
            <div className="nw-slideout-header">
                <h2 className="nw-slideout-title">Mask Controls</h2>
                <button className="nw-slideout-close" onClick={closeRight}>
                    ×
                </button>
            </div>

            <div className="nw-control-group">
                <div className="nw-field">
                    <label>Brush Size</label>
                    <input type="range" min="1" max="200" className="nw-slider" />
                </div>

                <div className="nw-field">
                    <label>Softness</label>
                    <input type="range" min="0" max="100" className="nw-slider" />
                </div>

                <div className="nw-field">
                    <label>Opacity</label>
                    <input type="range" min="0" max="100" className="nw-slider" />
                </div>

                <button className="nw-btn primary block">Invert Mask</button>
            </div>
        </div>
    );
}
