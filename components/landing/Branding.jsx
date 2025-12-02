'use client';

import { motion } from 'framer-motion';
import SectionShell, { item } from './SectionShell';
import TemplateList from './TemplateList';
import WorkspaceConsole from './WorkspaceConsole';
import ModeLayout from './ModeLayout';

const kitItems = [
    { id: 'br1', title: 'Brand Kit', category: 'Kit', tags: ['Colors', 'Fonts'] },
    { id: 'br2', title: 'Logo System', category: 'Logos', tags: ['Primary', 'Alt'] },
    { id: 'br3', title: 'Font Pairing', category: 'Typography', tags: ['Sans', 'Serif'] },
    { id: 'br4', title: 'Color Palette', category: 'Colors', tags: ['Pastel', 'Strong'] },
    { id: 'br5', title: 'Business Card', category: 'Print', tags: ['Minimal', 'Clean'] },
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
    { id: 'b1', label: 'Tokens', meta: 'Synced' },
    { id: 'b2', label: 'Lockups', meta: '6 variants' },
    { id: 'b3', label: 'Guidelines', meta: 'Draft' },
];

export default function Branding() {
    return (
        <SectionShell id='branding' title='Branding — Identity Builder' subtitle='Soft blue, white, and a hint of gold. Palettes expand on hover, logo cards rotate, and typography fades in sequence.' background='bg-branding' accentGlow='accent-branding' overline='Branding'>
            <ModeLayout
                flip
                left={<WorkspaceConsole title='Brand Workspace' subtitle='Tokens + Lockups' panels={consolePanels} accent='#3b82f6' footerTitle='Recent Brand' footerSubtitle='Deck in progress' footerImage='/images/branding.png' />}
                right={
                    <motion.div variants={item} className='space-y-6 mode-copy'>
                        <TemplateList title='Brand templates' description='Starter kits for decks, socials, and brand sheets.' items={templates} accent='#3b82f6' />
                        <div className='space-y-3'>
                            {kitItems.map((itemData, idx) => (
                                <motion.div key={itemData.title} variants={item} className='rounded-2xl border border-[#dce8ff] bg-white/90 px-4 py-3 text-slate-800 shadow-[0_18px_50px_rgba(160,190,255,0.25)] transition hover:-translate-y-1 hover:border-[#cddcff] info-card'>
                                    <div className='flex items-center justify-between'>
                                        <span className='font-semibold'>{itemData.title}</span>
                                        <motion.span animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 3 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' }} className='text-lg'>
                                            ✦
                                        </motion.span>
                                    </div>
                                    <p className='text-sm text-slate-600'>{itemData.detail}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                }
            />
        </SectionShell>
    );
}
