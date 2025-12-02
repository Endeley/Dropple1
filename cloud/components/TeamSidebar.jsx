"use client";

import { useTeamStore } from '../store/useTeamStore';

export default function TeamSidebar() {
    const teams = useTeamStore((s) => s.teams);

    return (
        <aside className='w-60 bg-zinc-950 text-white border-r border-zinc-800 h-full p-4 space-y-3'>
            <h3 className='text-lg font-bold'>Workspaces</h3>
            <nav className='space-y-2'>
                {teams.map((team) => (
                    <a
                        key={team.id}
                        href={`/workspace/${team.id}`}
                        className='block p-2 rounded bg-zinc-900 hover:bg-zinc-800 transition'
                    >
                        {team.name}
                    </a>
                ))}
            </nav>
        </aside>
    );
}
