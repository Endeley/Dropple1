"use client";

import { useRevisionStore } from './useRevisionStore';
import RevisionItem from './RevisionItem';

export default function RevisionSidebar() {
    const revisions = useRevisionStore((s) => s.revisionList);

    return (
        <div className='p-4 h-full bg-zinc-900 text-white overflow-y-auto'>
            <h2 className='text-lg font-bold mb-4'>Version History</h2>
            {revisions.map((r) => (
                <RevisionItem key={r.id} revision={r} />
            ))}
        </div>
    );
}
