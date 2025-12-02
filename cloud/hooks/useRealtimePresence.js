"use client";

import { useEffect } from 'react';
import { initPresence, sendCursor } from '../client/presence';

export const useRealtimePresence = (projectId, user) => {
    useEffect(() => {
        if (!projectId || !user) return;
        initPresence(projectId, user);
    }, [projectId, user]);

    useEffect(() => {
        const handler = (event) => {
            sendCursor({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);
};
