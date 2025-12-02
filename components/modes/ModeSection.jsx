'use client';

import { motion } from 'framer-motion';
import ModeTemplates from './ModeTemplates';
import ModeHero from './ModeHero';
import ModeCTA from './ModeCTA';

export default function ModeSection({ mode }) {
    return (
        <section id={mode.id} className={`h-screen w-full snap-start flex flex-col lg:flex-row items-center justify-between gap-8 px-6 lg:px-20 bg-linear-to-br ${mode.color} text-white`}>
            <ModeTemplates templates={mode.templates} />

            <div className='flex flex-col gap-4 max-w-lg'>
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='text-4xl lg:text-5xl font-bold'>
                    {mode.title}
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className='text-lg opacity-80'>
                    {mode.subtitle}
                </motion.p>

                <ModeCTA label={mode.cta} />
            </div>

            <ModeHero hero={mode.hero} />
        </section>
    );
}
