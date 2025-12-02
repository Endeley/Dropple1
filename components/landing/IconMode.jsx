'use client';

import { motion } from 'framer-motion';
import SectionShell, { item } from './SectionShell';
import TemplateList from './TemplateList';
import WorkspaceConsole from './WorkspaceConsole';
import ModeLayout from './ModeLayout';

const tools = ['Pen tool', 'Boolean ops', 'Pixel snap', 'Stroke → outline'];

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
    { id: 'ic1', label: 'Nodes', meta: '24 points', wiggle: 6 },
    { id: 'ic2', label: 'Layers', meta: 'Stroke + Fill' },
    { id: 'ic3', label: 'Export', meta: 'PNG / SVG' },
];

export default function IconMode() {
    return (
        <SectionShell id='icon-mode' title='Icon Mode — Vector Lab' subtitle='Dark gray canvas with purple neon strokes. Pen nodes pulse, bezier handles wiggle, and icon cards pop into view.' background='bg-icon' accentGlow='accent-icon' overline='Icon Mode' tone='dark'>
            <ModeLayout
                left={
                    <motion.div variants={item} className='space-y-6 text-white mode-copy'>
                        <TemplateList title='Icon templates' description='Vector grids, packs, and stroke variants.' items={templates} accent='#7f6bff' />
                        <div className='space-y-3'>
                            {tools.map((tool, idx) => (
                                <motion.div key={tool} variants={item} className='flex items-center gap-3 rounded-2xl border border-[#7f6bff]/30 bg-white/5 px-4 py-3 text-sm font-semibold shadow-[0_18px_50px_rgba(127,107,255,0.35)] backdrop-blur-lg info-card'>
                                    <motion.span animate={{ scale: [1, 1.12, 1], rotate: [-4, 4, -4] }} transition={{ duration: 2.8 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' }} className='h-2 w-2 rounded-full bg-[#9c84ff] shadow-[0_0_14px_rgba(156,132,255,0.9)]' />
                                    {tool}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                }
                right={<WorkspaceConsole title='Vector Lab' subtitle='Nodes • Boolean • Export' panels={consolePanels} accent='#7f6bff' footerTitle='Recent Pack' footerSubtitle='Outline icons' footerImage='/images/icons.png' />}
            />
        </SectionShell>
    );
}
