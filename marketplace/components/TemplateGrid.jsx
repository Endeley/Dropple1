"use client";

import TemplateCard from './TemplateCard';

export default function TemplateGrid({ templates }) {
    if (!templates?.length) {
        return <p className='text-zinc-400'>No templates match your filters yet.</p>;
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {templates.map((template) => (
                <TemplateCard key={template.id} template={template} />
            ))}
        </div>
    );
}
