'use client';

import { motion } from 'framer-motion';
import SectionShell, { item } from './SectionShell';
import TemplateList from './TemplateList';
import WorkspaceConsole from './WorkspaceConsole';
import ModeLayout from './ModeLayout';

const features = ['Artboards, grids, and smart align', 'Blend modes, masks, shadows, glow', 'Palette exploration with live swatches', 'Print/export presets with bleed + safe zones'];

const templates = [
    { id: 'gd1', title: 'Summer Party Flyer', category: 'Flyer', tags: ['A4', 'Vibrant'] },
    { id: 'gd2', title: 'Art Exhibition Poster', category: 'Poster', tags: ['Modern', 'Minimal'] },
    { id: 'gd3', title: 'Fashion Promo', category: 'Social', tags: ['Instagram', 'Neon'] },
    { id: 'gd4', title: 'Restaurant Menu', category: 'Menu', tags: ['Food', 'Elegant'] },
    { id: 'gd5', title: 'Business Brochure', category: 'Brochure', tags: ['Corporate', 'Clean'] },
    { id: 'gd6', title: 'Real Estate Flyer', category: 'Flyer', tags: ['Luxury', 'Modern'] },
    { id: 'gd7', title: 'Podcast Cover', category: 'Cover', tags: ['Bold', 'Colorful'] },
    { id: 'gd8', title: 'Minimal Poster', category: 'Poster', tags: ['Typography', 'Black/White'] },
    { id: 'gd9', title: 'Beauty Sale Ad', category: 'Social', tags: ['Elegant', 'Gradient'] },
    { id: 'gd10', title: 'Event Invitation', category: 'Invite', tags: ['Clean', 'Classic'] },
    { id: 'gd11', title: 'Marketing Banner', category: 'Banner', tags: ['Wide', 'Tech'] },
    { id: 'gd12', title: 'Fitness Promo', category: 'Social', tags: ['Bold', 'Dynamic'] },
];

const consolePanels = [
    { id: 'p1', label: 'Layers', meta: '12', wiggle: 8 },
    { id: 'p2', label: 'Effects stack', meta: 'Glow + Noise' },
    { id: 'p3', label: 'Export presets', meta: 'PNG / PDF' },
];

export default function GraphicDesign() {
    return (
        <SectionShell id='graphic-design' title='Graphic Design — Color Playground' subtitle='Bright color fields, floating circles, and canvas zoom invite visual creators to build fast.' background='bg-graphic' accentGlow='accent-graphic' overline='Graphic Design'>
            <ModeLayout
                left={
                    <motion.div variants={item} className='space-y-6 mode-copy'>
                        <TemplateList title='Templates' description='Drop into motion-ready canvases for posters, social, and brand sheets.' items={templates} accent='#f59e0b' />
                        <div className='feature-pills'>
                            {features.map((feature) => (
                                <span key={feature} className='feature-pill'>
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                }
                right={<WorkspaceConsole title='Canvas — Gradient Glow' subtitle='Artboard 1920x1080 • Palette synced' panels={consolePanels} accent='#f59e0b' footerTitle='Recent Template' footerSubtitle='Gradient poster' footerImage='/images/design.png' />}
            />
        </SectionShell>
    );
}
