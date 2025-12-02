"use client";

import { useTeamStore } from '../store/useTeamStore';

export default function MemberList() {
    const members = useTeamStore((s) => s.members);

    return (
        <div className='bg-zinc-900 rounded border border-zinc-800 p-4 text-white space-y-3'>
            <h4 className='font-semibold'>Team members</h4>
            {members.map((member) => (
                <div key={member.id} className='flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                        <img src={member.avatar} alt={member.name} className='w-6 h-6 rounded-full object-cover' />
                        <span>{member.name}</span>
                    </div>
                    <span className='text-zinc-400'>{member.role}</span>
                </div>
            ))}
        </div>
    );
}
