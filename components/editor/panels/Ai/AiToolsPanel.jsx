'use client';

import AiToolCard from './helpers/AiToolCard';
import AiErasePanel from './AiErasePanel';
import AiFillPanel from './AiFillPanel';
import AiReplaceBgPanel from './AiReplaceBgPanel';
import AiUpscalePanel from './AiUpscalePanel';
import AiGeneratePanel from './AiGeneratePanel';
import AiStyleTransferPanel from './AiStyleTransferPanel';
import AiOutpaintPanel from './AiOutpaintPanel';

import { useState } from 'react';

const TOOL_CONFIG = [
    { id: 'ai-erase', label: 'Magic Erase', component: AiErasePanel },
    { id: 'ai-fill', label: 'AI Fill', component: AiFillPanel },
    { id: 'ai-replace-bg', label: 'Replace Background', component: AiReplaceBgPanel },
    { id: 'ai-upscale', label: 'Upscale', component: AiUpscalePanel },
    { id: 'ai-generate', label: 'Generate Image', component: AiGeneratePanel },
    { id: 'ai-style', label: 'Style Transfer', component: AiStyleTransferPanel },
    { id: 'ai-outpaint', label: 'Outpaint', component: AiOutpaintPanel },
];

export default function AiToolsPanel() {
    const [activeTool, setActiveTool] = useState(TOOL_CONFIG[0].id);

    const renderPanel = () => {
        const config = TOOL_CONFIG.find((tool) => tool.id === activeTool);
        if (!config) return null;
        const PanelComponent = config.component;
        return <PanelComponent />;
    };

    return (
        <div className='flex flex-col gap-8 items-center h-full px-6 py-6'>
            <h2 className='text-2xl font-black uppercase tracking-wide'>
                <span className='bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] bg-clip-text text-transparent'>AI Tools</span>
            </h2>

            <div className='grid grid-cols-2 gap-4 w-full'>
                {TOOL_CONFIG.map((tool) => (
                    <AiToolCard key={tool.id} tool={tool} isActive={activeTool === tool.id} onSelect={setActiveTool} />
                ))}
            </div>

            <div className='flex-1 overflow-y-auto p-8 mt-8 w-full rounded-3xl border border-[#27272A] bg-[#0F0F12]/90 shadow-[0_30px_80px_rgba(124,58,237,0.25)]'>
                {renderPanel()}
            </div>
        </div>
    );
}
