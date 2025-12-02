"use client";

import { useLayersStore } from './useLayersStore';

export default function LayerGroupItem({ group, childrenLayers, level = 0 }) {
    const collapsed = useLayersStore((s) => s.collapsedGroups[group.id] || false);
    const toggleGroup = useLayersStore((s) => s.toggleGroup);

    return (
        <div>
            <div
                className='flex items-center p-2 bg-zinc-700 border-b border-zinc-600 cursor-pointer'
                onClick={() => toggleGroup(group.id)}
                style={{ paddingLeft: `${level * 12}px` }}>
                <span>{collapsed ? '▶' : '▼'}</span>
                <span className='ml-2'>{group.name}</span>
            </div>

            {!collapsed && <div className='ml-4'>{childrenLayers}</div>}
        </div>
    );
}
