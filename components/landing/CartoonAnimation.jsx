'use client';

import { motion } from 'framer-motion';
import SectionShell, { item } from './SectionShell';
import TemplateList from './TemplateList';
import WorkspaceConsole from './WorkspaceConsole';
import ModeLayout from './ModeLayout';

const beats = [
    { id: 'an1', title: 'Character Walk Cycle', category: 'Character', tags: ['2D', 'Cute'] },
    { id: 'an2', title: 'Talking Head', category: 'Character', tags: ['Dialogue', 'Lip Sync'] },
    { id: 'an3', title: 'Storyboard Sequence', category: 'Storyboard', tags: ['Panels', 'Sketch'] },
    { id: 'an4', title: 'Scene Transition', category: 'Motion', tags: ['Fade', 'Zoom'] },
    { id: 'an5', title: 'Logo Animation', category: 'Brand', tags: ['Reveal', 'Glow'] },
];

const templates = [
    { id: 'dev1', title: 'API Docs Page', category: 'Docs', tags: ['REST', 'Clean'] },
    { id: 'dev2', title: 'Code Editor Layout', category: 'Editor', tags: ['Dark', 'Green'] },
    { id: 'dev3', title: 'Mock API Response', category: 'Mock', tags: ['JSON', 'Schema'] },
    { id: 'dev4', title: 'Component Preview', category: 'UI', tags: ['React', 'Tailwind'] },
    { id: 'dev5', title: 'Auth Flow', category: 'Auth', tags: ['Login', 'Secure'] },
    { id: 'dev6', title: 'API Playground', category: 'Testing', tags: ['Live', 'Console'] },
    { id: 'dev7', title: 'Webhook Tester', category: 'Tools', tags: ['Events', 'Payload'] },
    { id: 'dev8', title: 'Token Manager', category: 'Security', tags: ['JWT', 'Keys'] },
    { id: 'dev9', title: 'Database Schema', category: 'DB', tags: ['Tables', 'Models'] },
    { id: 'dev10', title: 'GraphQL Explorer', category: 'Tools', tags: ['Queries', 'Schema'] },
    { id: 'dev11', title: 'Error Logs', category: 'Monitoring', tags: ['Debug', 'Console'] },
    { id: 'dev12', title: 'CLI Output', category: 'Terminal', tags: ['Commands', 'Green'] },
];

const consolePanels = [
    { id: 'a1', label: 'Timeline', meta: '24 fps', wiggle: 7 },
    { id: 'a2', label: 'Keyframes', meta: '36 keys' },
    { id: 'a3', label: 'Camera', meta: 'Pan / Zoom' },
];

export default function CartoonAnimation() {
    return (
        <SectionShell id='cartoon-animation' title='Cartoon & Animation — Motion Playground' subtitle='Purple-pink neon, looping characters, and a gently moving timeline keep the playground energetic.' background='bg-cartoon' accentGlow='accent-cartoon' overline='Cartoon & Animation' tone='dark'>
            <ModeLayout
                flip
                left={<WorkspaceConsole title='Animation Playground' subtitle='Tracks, rigs, cameras' panels={consolePanels} accent='#a855f7' footerTitle='Recent Scene' footerSubtitle='Character loop' footerImage='/images/catoon.png' />}
                right={
                    <motion.div variants={item} className='space-y-6 mode-copy text-white'>
                        <TemplateList title='Animation templates' description='Character loops, storyboards, and motion intros ready to start.' items={templates} accent='#a855f7' />
                        <div className='space-y-3'>
                            {beats.map((beat) => (
                                <motion.div key={beat.id} variants={item} className='rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white shadow-[0_18px_50px_rgba(158,94,255,0.35)] backdrop-blur-lg info-card'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm font-semibold'>{beat.title}</span>
                                        <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} className='h-2 w-2 rounded-full bg-[#ff4df0] shadow-[0_0_14px_rgba(255,77,240,0.9)]' />
                                    </div>
                                    <p className='mt-1 text-sm text-white/70'>
                                        {beat.category} • {beat.tags.join(' · ')}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                }
            />
        </SectionShell>
    );
}
