"use client";

import { useEffect } from 'react';
import { useCreatorStore } from '../../store/useCreatorStore';
import TemplateGrid from '../../components/TemplateGrid';

export default function CreatorProfilePage({ params }) {
    const { id } = params;
    const { creator, templates, setCreator, setTemplates, loading, setLoading } = useCreatorStore();

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch(`/api/marketplace/creator?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!mounted) return;
                setCreator(data.creator);
                setTemplates(data.templates || []);
            })
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, [id, setCreator, setLoading, setTemplates]);

    if (loading || !creator) {
        return <div className='p-6 text-white'>Loading creator…</div>;
    }

    return (
        <div className='p-6 text-white space-y-6'>
            <div className='flex flex-col md:flex-row gap-4 items-center md:items-start'>
                <img src={creator.avatar} className='w-24 h-24 rounded-full object-cover border border-zinc-800' alt={creator.name} />
                <div>
                    <h1 className='text-3xl font-bold'>{creator.name}</h1>
                    <p className='text-zinc-400'>{creator.bio}</p>
                    <p className='text-sm text-zinc-500 mt-1'>{creator.followers} followers</p>
                </div>
            </div>

            <div>
                <h2 className='text-2xl font-semibold mb-4'>Templates</h2>
                <TemplateGrid templates={templates} />
            </div>
        </div>
    );
}
