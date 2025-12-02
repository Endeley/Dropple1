'use client';

import { motion } from 'framer-motion';
import SectionShell, { item } from './SectionShell';
import TemplateList from './TemplateList';
import WorkspaceConsole from './WorkspaceConsole';
import ModeLayout from './ModeLayout';

const episodes = [
    { title: 'Episode 18 — Motion-first design', duration: '32:10' },
    { title: 'Episode 19 — AI copilots', duration: '28:44' },
];

const templates = [
    { id: 'mui1', title: 'Button Variants', category: 'Buttons', tags: ['Primary', 'Secondary'] },
    { id: 'mui2', title: 'Input Fields', category: 'Inputs', tags: ['Filled', 'Outlined'] },
    { id: 'mui3', title: 'Card Components', category: 'Cards', tags: ['Glass', 'Shadow'] },
    { id: 'mui4', title: 'Navbar Layouts', category: 'Navigation', tags: ['Horizontal', 'Sticky'] },
    { id: 'mui5', title: 'Sidebar Menu', category: 'Navigation', tags: ['Minimal', 'Icons'] },
    { id: 'mui6', title: 'Modal Windows', category: 'Overlay', tags: ['Blurred', 'Center'] },
    { id: 'mui7', title: 'Tabs Variants', category: 'Tabs', tags: ['Underlined', 'Lifted'] },
    { id: 'mui8', title: 'Badge Types', category: 'Badges', tags: ['Counters', 'Labels'] },
    { id: 'mui9', title: 'Form Layouts', category: 'Forms', tags: ['Simple', 'Grid'] },
    { id: 'mui10', title: 'Avatar Sets', category: 'UI', tags: ['Circle', 'Square'] },
    { id: 'mui11', title: 'Button Groups', category: 'Buttons', tags: ['Grouped', 'Actions'] },
    { id: 'mui12', title: 'Data Tables', category: 'Data', tags: ['Sort', 'Filter'] },
];

const consolePanels = [
    { id: 'p1', label: 'Tracks', meta: 'Mic / Music', wiggle: 6 },
    { id: 'p2', label: 'Effects', meta: 'NR + Compressor' },
    { id: 'p3', label: 'Transcript', meta: 'Auto-sync' },
];

export default function PodcastStudio() {
    return (
        <SectionShell id='podcast-studio' title='Podcast Studio — Sound Waves' subtitle='Purple and cyan waves animate, cards slide from the right, and microphones tilt toward the cursor.' background='bg-podcast' accentGlow='accent-podcast' overline='Podcast' tone='dark'>
            <ModeLayout
                left={
                    <motion.div variants={item} className='space-y-6 text-white mode-copy'>
                        <TemplateList title='Podcast templates' description='Sessions for interviews, solo episodes, and trailers.' items={templates} accent='#7c5bff' />
                        <div className='space-y-3'>
                            <div className='overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(107,84,255,0.35)] backdrop-blur-lg'>
                                <motion.div animate={{ x: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className='h-16 rounded-xl bg-linear-to-r from-[#7c5bff] via-[#4ee0ff] to-[#7c5bff] opacity-80 blur-sm' />
                                <div className='mt-3 text-base text-white/75'>Waveform animates like a real signal.</div>
                            </div>

                            {episodes.map((ep, idx) => (
                                <motion.div
                                    key={ep.title}
                                    variants={item}
                                    initial={false}
                                    animate={{ x: [20, 0] }}
                                    transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.1 }}
                                    className='flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_18px_50px_rgba(96,132,255,0.3)] info-card'>
                                    <div>
                                        <p className='text-base font-semibold'>{ep.title}</p>
                                        <p className='text-sm text-white/60'>{ep.duration}</p>
                                    </div>
                                    <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className='text-lg'>
                                        🎙️
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                }
                right={<WorkspaceConsole title='Podcast Studio' subtitle='Live waveforms • NR on' panels={consolePanels} accent='#7c5bff' footerTitle='Recent Episode' footerSubtitle='Interview setup' footerImage='/images/podcast.png' />}
            />
        </SectionShell>
    );
}
