'use client';
import StyleCard from './StyleCard';

const STYLES = [
    {
        id: 1,
        name: 'Vibrant Purple',
        colors: ['#7C3AED', '#A855F7', '#C084FC'],
        font: 'Poppins',
    },
    {
        id: 2,
        name: 'Earthy Neutral',
        colors: ['#A16207', '#854D0E', '#713F12'],
        font: 'Inter',
    },
    {
        id: 3,
        name: 'Cyber Neon',
        colors: ['#06B6D4', '#3B82F6', '#8B5CF6'],
        font: 'Mono',
    },
];

export default function StyleLibrary() {
    return (
        <div className='flex flex-col gap-4'>
            {STYLES.map((s) => (
                <StyleCard key={s.id} style={s} />
            ))}
        </div>
    );
}
