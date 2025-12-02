'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWorkspaceUIStore } from '@/lib/state/ui/useWorkspaceUIStore';
import { useImageWorkspaceStore } from '@/lib/state/workspaces/image/useImageWorkspaceStore';

export default function AssetBrowser() {
    const close = useWorkspaceUIStore((s) => s.closeLeft);
    const activeLeft = useWorkspaceUIStore((s) => s.activeLeftSlideout);
    const assets = useImageWorkspaceStore((s) => s.assets) || [];
    const addImageFromFile = useImageWorkspaceStore((s) => s.addImageFromFile);
    const placeAsset = useImageWorkspaceStore((s) => s.placeAssetOnCanvas);
    const hydrateAssets = useImageWorkspaceStore((s) => s.hydrateAssets);
    const fileInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('uploads');

    useEffect(() => {
        hydrateAssets();
    }, [hydrateAssets]);

    const tabs = [
        { id: 'uploads', label: 'Uploads' },
        { id: 'templates', label: 'Templates' },
        { id: 'elements', label: 'Elements' },
        { id: 'brand', label: 'Brand' },
    ];

    const filtered = useMemo(() => {
        const lower = activeTab;
        return assets.filter((a) => (a.category || 'uploads') === lower);
    }, [assets, activeTab]);

    if (activeLeft !== 'assets') return null;

    return (
        <div className='nw-slideout-content'>
            <div className='nw-slideout-header'>
                <h2 className='nw-slideout-title'>Assets</h2>
                <button className='nw-slideout-close' onClick={close}>
                    ×
                </button>
            </div>

            <div className='flex items-center gap-2 mb-3'>
                <button
                    type='button'
                    className='nw-btn primary flex-1'
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload image
                </button>
                <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    ref={fileInputRef}
                    onChange={(e) => {
                        const file = e.target?.files?.[0];
                        if (file) addImageFromFile(file);
                        if (e.target) e.target.value = '';
                    }}
                />
            </div>

            <div className='flex items-center gap-2 mb-3'>
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        type='button'
                        className={`flex-1 rounded-md border px-2 py-1 text-sm ${activeTab === t.id ? 'border-violet-500 text-violet-600' : 'border-neutral-200 text-neutral-700'}`}
                        onClick={() => setActiveTab(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className='nw-asset-grid'>
                {filtered.map((asset) => (
                    <button
                        key={asset.id}
                        type='button'
                        className='nw-asset-item'
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text/asset-id', asset.id);
                            if (asset.src) {
                                e.dataTransfer.setData('text/uri-list', asset.src);
                                e.dataTransfer.setData('text/plain', asset.src);
                            }
                        }}
                        onClick={() => {
                            const canvas = useImageWorkspaceStore.getState().canvas;
                            let point = null;
                            if (canvas?.getCenter) {
                                const center = canvas.getCenter();
                                point = { x: center.left, y: center.top };
                            }
                            placeAsset(asset.id, point);
                        }}
                    >
                        <img src={asset.src} alt={asset.name || 'Asset'} />
                        <span className='nw-asset-label'>{asset.name || 'Asset'}</span>
                    </button>
                ))}
                {!filtered.length && <p className='text-sm text-neutral-500'>No assets yet. Upload to add one.</p>}
            </div>
        </div>
    );
}
