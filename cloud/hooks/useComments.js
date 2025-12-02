"use client";

import { useEffect, useState } from 'react';

export const useComments = (projectId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!projectId) return;
        fetch(`/api/comments/list?projectId=${projectId}`)
            .then((res) => res.json())
            .then(setComments)
            .catch(() => setComments([]));
    }, [projectId]);

    const addComment = async (payload) => {
        const res = await fetch('/api/comments/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, ...payload }),
        });
        if (res.ok) {
            const comment = await res.json();
            setComments((prev) => [...prev, comment]);
        }
    };

    const resolveComment = async (id) => {
        await fetch('/api/comments/resolve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    return { comments, addComment, resolveComment };
};
