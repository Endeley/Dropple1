'use client';
import { useState } from 'react';
import DesignTabs from './DesignTabs';
import TemplateLibrary from '@/components/TemplateLibrary';
import AssetLibrary from '@/components/AssetLibrary';
import StyleLibrary from './StyleLibrary';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function DesignPanel() {
    const [tab, setTab] = useState('templates');
    const canvas = useCanvasStore((s) => s.canvas);

    const renderContent = () => {
        switch (tab) {
            case 'templates':
                return <TemplateLibrary canvas={canvas} />;
            case 'assets':
                return <AssetLibrary canvas={canvas} />;
            case 'styles':
                return <StyleLibrary />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col h-full gap-5'>
            {/* Header */}
            <h2
                className='
        text-2xl font-black uppercase
        tracking-wide 
        dark:text-white
      '>
                Design
            </h2>

            <DesignTabs value={tab} onChange={setTab} />

            <div className='flex-1 overflow-y-auto pr-2'>{renderContent()}</div>
        </div>
    );
}
