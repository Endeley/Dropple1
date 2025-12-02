import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";

export default function FilterBrowser() {
    const filters = ['B&W', 'Vibrant', 'Cinematic', 'Soft Light', 'Matte'];
    const activeLeft = useWorkspaceUIStore((s) => s.activeLeftSlideout);

    if (activeLeft !== 'filters') return null;

    return (
        <div className='nw-slideout-content'>
            <div className='nw-slideout-header'>
                <h2 className='nw-slideout-title'>Filters</h2>
            </div>

            <div className='nw-filter-grid'>
                {filters.map((f) => (
                    <div key={f} className='nw-filter-item'>
                        <div className='nw-filter-preview' />
                        <p className='nw-filter-name'>{f}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
