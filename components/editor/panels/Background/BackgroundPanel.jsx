'use client';

import { useState } from 'react';
import BackgroundTabs from './BackgroundTabs';
import SolidBackgroundLibrary from './SolidBackgroundLibrary';
import GradientBackgroundLibrary from './GradientBackgroundLibrary';
import TextureBackgroundLibrary from './TextureBackgroundLibrary';
import AiBackgroundLibrary from './AiBackgroundLibrary';

export default function BackgroundPanel({ fabricCanvas }) {
    const [tab, setTab] = useState('solid');

    const renderContent = () => {
        switch (tab) {
            case 'solid':
                return <SolidBackgroundLibrary fabricCanvas={fabricCanvas} />;
            case 'gradient':
                return <GradientBackgroundLibrary fabricCanvas={fabricCanvas} />;
            case 'texture':
                return <TextureBackgroundLibrary fabricCanvas={fabricCanvas} />;
            case 'ai':
                return <AiBackgroundLibrary fabricCanvas={fabricCanvas} />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col h-full gap-5'>
            <h2 className='text-2xl font-black uppercase tracking-wide dark:text-white'>Background</h2>

            <BackgroundTabs value={tab} onChange={setTab} />

            <div className='flex-1 overflow-y-auto pr-2'>{renderContent()}</div>
        </div>
    );
}
