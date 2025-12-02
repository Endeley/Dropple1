'use client';

import { useState } from 'react';
import PhotoTabs from './PhotoTabs';
import StockPhotoLibrary from './StockPhotoLibrary';
import AiPhotoLibrary from '../Ai/helpers/AiPhotoLibrary';

export default function PhotosPanel() {
    const [tab, setTab] = useState('stock');

    const renderContent = () => {
        switch (tab) {
            case 'stock':
                return <StockPhotoLibrary />;
            case 'ai':
                return <AiPhotoLibrary />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col h-full gap-5'>
            <h2 className='text-2xl font-black uppercase tracking-wide dark:text-white'>Photos</h2>

            <PhotoTabs value={tab} onChange={setTab} />

            <div className='flex-1 overflow-y-auto pr-2'>{renderContent()}</div>
        </div>
    );
}
