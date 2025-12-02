"use client";

import { useState } from 'react';
import { useTeamStore } from '../store/useTeamStore';

export default function WorkspaceSwitcher() {
    const teams = useTeamStore((s) => s.teams);
    const currentTeam = useTeamStore((s) => s.currentTeam);
    const setCurrentTeam = useTeamStore((s) => s.setCurrentTeam);
    const [open, setOpen] = useState(false);

    return (
        <div className='relative'>
            <button
                onClick={() => setOpen((o) => !o)}
                className='px-3 py-1 bg-zinc-900 rounded text-white border border-zinc-700'
            >
                {currentTeam?.name || 'Select workspace'}
            </button>
            {open && (
                <div className='absolute mt-2 bg-zinc-900 border border-zinc-800 rounded shadow-lg w-48 z-20'>
                    {teams.map((team) => (
                        <button
                            key={team.id}
                            className='block w-full text-left px-3 py-2 hover:bg-zinc-800 text-white'
                            onClick={() => {
                                setCurrentTeam(team);
                                setOpen(false);
                            }}
                        >
                            {team.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
