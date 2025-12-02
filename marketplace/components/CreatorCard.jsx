"use client";

export default function CreatorCard({ creator }) {
    return (
        <a
            href={`/marketplace/creator/${creator.id}`}
            className='flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-purple-500 transition'
        >
            <img src={creator.avatar} alt={creator.name} className='w-14 h-14 rounded-full object-cover border border-zinc-700' />
            <div className='text-white'>
                <p className='font-semibold'>{creator.name}</p>
                <p className='text-xs text-zinc-400'>{creator.followers} followers</p>
            </div>
        </a>
    );
}
