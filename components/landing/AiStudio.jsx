'use client';

import { motion } from 'framer-motion';
import SectionShell, { item } from './SectionShell';
import TemplateList from './TemplateList';
import WorkspaceConsole from './WorkspaceConsole';
import ModeLayout from './ModeLayout';

const prompts = ['Generate product hero in neon city style', 'Remove background and upscale to 4K', 'Create five icon variations in brand palette'];

const templates = [
    { id: 'ai1', title: 'Logo Generator', category: 'Brand', tags: ['AI Logo', 'Variants'] },
    { id: 'ai2', title: 'Scene Concept Art', category: 'Art', tags: ['Landscape', 'HD'] },
    { id: 'ai3', title: 'Portrait Generator', category: 'Faces', tags: ['Realistic', 'Stylized'] },
    { id: 'ai4', title: 'Product Mockup', category: 'Mockups', tags: ['T-Shirt', 'Bottle'] },
    { id: 'ai5', title: 'UI Layout Generator', category: 'UI', tags: ['Landing', 'Mobile'] },
    { id: 'ai6', title: 'Storyboarding', category: 'Storyboard', tags: ['Panels', 'Scenes'] },
    { id: 'ai7', title: 'Icon Pack Generator', category: 'Icons', tags: ['Material', 'Outline'] },
    { id: 'ai8', title: '3D Object', category: '3D', tags: ['Glossy', 'Detailed'] },
    { id: 'ai9', title: 'Poster Art', category: 'Art', tags: ['Abstract', 'Colorful'] },
    { id: 'ai10', title: 'Anime Scene', category: 'Anime', tags: ['Action', 'Stylized'] },
    { id: 'ai11', title: 'Landscape Generator', category: 'Art', tags: ['Mountains', 'Sunset'] },
    { id: 'ai12', title: 'Avatar Creator', category: 'Faces', tags: ['Cute', 'Stylized'] },
];

const consolePanels = [
    { id: 'ai-p1', label: 'Prompts', meta: '4 saved', wiggle: 6 },
    { id: 'ai-p2', label: 'History', meta: 'Last 10 runs' },
    { id: 'ai-p3', label: 'Outputs', meta: 'Grid view' },
];

export default function AiStudio() {
    return (
        <SectionShell id='ai-studio' title='AI Studio — Holographic Creativity' subtitle='Electric neon blue glow, looping prompt typing, and cards that flip upward as results stream in.' background='bg-ai' accentGlow='accent-ai' overline='AI Studio' tone='dark'>
            <ModeLayout
                flip
                left={<WorkspaceConsole title='AI Studio — Prompt Lab' subtitle='Neon generation flow' panels={consolePanels} accent='#22d3ee' footerTitle='Recent Output' footerSubtitle='Neon hero render' footerImage='/images/ai.png' />}
                right={
                    <motion.div variants={item} className='space-y-6 text-white mode-copy'>
                        <TemplateList title='Prompt recipes' description='Pre-tuned prompts for hero renders, backgrounds, and icon packs.' items={templates} accent='#22d3ee' />
                        <div className='space-y-2'>
                            {prompts.map((prompt, idx) => (
                                <motion.div key={prompt} variants={item} whileHover={{ scale: 1.02 }} className='rounded-2xl border border-[#35d0ff]/40 bg-white/5 px-4 py-3 text-base font-semibold text-white shadow-[0_18px_60px_rgba(0,213,255,0.35)] backdrop-blur-lg info-card'>
                                    <span className='text-[#7de3ff]'>▸</span> {prompt}
                                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' }} className='ml-2 text-xs text-white/60'>
                                        typing...
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                }
            />
        </SectionShell>
    );
}
