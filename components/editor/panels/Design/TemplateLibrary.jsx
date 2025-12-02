'use client';
import TemplateCard from './TemplateCard';
import TemplateSkeleton from './TemplateSkeleton';

const SAMPLE_TEMPLATES = [
    { id: 1, title: 'Modern Flyer', preview: '/templates/flyer1.jpg' },
    { id: 2, title: 'Minimal Poster', preview: '/templates/poster1.jpg' },
    { id: 3, title: 'Instagram Post', preview: '/templates/ig1.jpg' },
    { id: 4, title: 'Business Card', preview: '/templates/card1.jpg' },
    { id: 5, title: 'Classy Resume', preview: '/templates/resume1.jpg' },
];

export default function TemplateLibrary() {
    const templates = SAMPLE_TEMPLATES;
    const isLoading = false;

    if (isLoading) {
        return (
            <div className='grid grid-cols-2 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                    <TemplateSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className='grid grid-cols-2 gap-4'>
            {templates.map((t) => (
                <TemplateCard key={t.id} template={t} />
            ))}
        </div>
    );
}
