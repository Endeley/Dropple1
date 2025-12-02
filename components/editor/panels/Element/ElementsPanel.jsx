'use client';

import { useState } from 'react';
import ElementsTabs from './ElementsTabs';
import ShapeLibrary from './ShapeLibrary';
import IconLibrary from './IconLibrary';
import IllustrationLibrary from './IllustrationLibrary';
import GradientLibrary from './GradientLibrary';

export default function ElementsPanel({ fabricCanvas }) {
    const [tab, setTab] = useState('shapes');

    const renderContent = () => {
        switch (tab) {
            case 'shapes':
                return <ShapeLibrary fabricCanvas={fabricCanvas} />;
            case 'icons':
                return <IconLibrary fabricCanvas={fabricCanvas} />;
            case 'illustrations':
                return <IllustrationLibrary fabricCanvas={fabricCanvas} />;
            case 'gradients':
                return <GradientLibrary fabricCanvas={fabricCanvas} />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col h-full gap-5'>
            <h2 className='text-2xl font-black uppercase dark:text-white tracking-wide'>Elements</h2>

            <ElementsTabs value={tab} onChange={setTab} />

            <div className='flex-1 overflow-y-auto pr-2'>{renderContent()}</div>
        </div>
    );
}
