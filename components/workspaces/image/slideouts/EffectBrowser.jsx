import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";

export default function EffectBrowser() {
    const effects = ['Blur', 'Vignette', 'Grain', 'Duotone', 'Sharpen'];
    const activeLeft = useWorkspaceUIStore((s) => s.activeLeftSlideout);

    if (activeLeft !== 'effects') return null;

    return (
        <div className='nw-slideout-content'>
            <div className='nw-slideout-header'>
                <h2 className='nw-slideout-title'>Effects</h2>
            </div>

            <div className='nw-effect-list'>
                {effects.map((e) => (
                    <div key={e} className='nw-effect-item'>
                        {e}
                    </div>
                ))}
            </div>
        </div>
    );
}
