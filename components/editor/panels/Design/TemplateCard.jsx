'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TemplateCard({ template }) {
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className='
        rounded-xl overflow-hidden
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal
        cursor-pointer
      '>
        <div className='w-full h-40 relative'>
            <Image src={template.preview} alt={template.title} fill className='object-cover' />
        </div>
        <div className='p-3 font-semibold text-sm'>{template.title}</div>
            <div className='p-3 font-semibold text-sm'>{template.title}</div>
        </motion.div>
    );
}
