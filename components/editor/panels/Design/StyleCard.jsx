'use client';
import { motion } from 'framer-motion';

export default function StyleCard({ style }) {
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className='
        border-2 border-neutral-300 dark:border-neutral-700
        rounded-xl p-4
        shadow-brutal
        bg-white dark:bg-neutral-800
        cursor-pointer
        flex flex-col gap-4
      '>
            <div className='flex gap-2'>
                {style.colors.map((c, i) => (
                    <div key={i} className='w-10 h-10 rounded-lg border-2 border-black' style={{ backgroundColor: c }} />
                ))}
            </div>

            <div className='font-semibold text-sm'>{style.name}</div>

            <div className='text-xs opacity-70'>Font: {style.font}</div>
        </motion.div>
    );
}
