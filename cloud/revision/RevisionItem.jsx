"use client";

import { restoreRevision } from './restoreRevision';

export default function RevisionItem({ revision }) {
    return (
        <div
            className='p-3 bg-zinc-800 rounded mb-3 hover:bg-zinc-700 cursor-pointer'
            onClick={() => restoreRevision(revision.id)}>
            <div className='text-xs text-zinc-300'>{new Date(revision.createdAt).toLocaleString()}</div>
            <div className='font-medium'>{revision.label}</div>
        </div>
    );
}
