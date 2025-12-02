'use client';

import { useState } from 'react';
import TextTabs from './TextTabs';
import TextHeadingLibrary from './TextHeadingLibrary';
import TextPresetLibrary from './TextPresetLibrary';
import FontLibrary from './FontLibrary';

export default function TextPanel({ fabricCanvas }) {
    const [tab, setTab] = useState('headings');

    const renderContent = () => {
        switch (tab) {
            case 'headings':
                return <TextHeadingLibrary fabricCanvas={fabricCanvas} />;
            case 'presets':
                return <TextPresetLibrary fabricCanvas={fabricCanvas} />;
            case 'fonts':
                return <FontLibrary fabricCanvas={fabricCanvas} />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col h-full gap-5'>
            <h2 className='text-2xl font-black uppercase tracking-wide dark:text-white'>Text</h2>

            <TextTabs value={tab} onChange={setTab} />

            <div className='flex-1 overflow-y-auto pr-2'>{renderContent()}</div>
        </div>
    );
}
