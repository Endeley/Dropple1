"use client";

import { useEffect } from 'react';
import { initRealtime, subscribeRealtime, sendOperation } from '../client/realtime';
import { applyRemoteOperation } from '../client/collaboration';
import { useProjectStore } from '../store/useProjectStore';

export const useProjectSync = (projectId, canvas) => {
    const addUpdate = useProjectStore((s) => s.addUpdate);

    useEffect(() => {
        if (!projectId) return;
        initRealtime(projectId);
        const unsubscribe = subscribeRealtime((message) => {
            if (message.type === 'op') {
                applyRemoteOperation(canvas, message.payload);
            }
        });
        return unsubscribe;
    }, [projectId, canvas]);

    useEffect(() => {
        if (!canvas) return;
        const handler = (event) => {
            const target = event.target;
            if (!target.__id) target.__id = crypto.randomUUID();
            const op = {
                type: 'transform',
                target: target.__id,
                left: target.left,
                top: target.top,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                angle: target.angle,
            };
            addUpdate(op);
            sendOperation(op);
        };
        canvas.on('object:modified', handler);
        return () => canvas.off('object:modified', handler);
    }, [canvas, addUpdate]);
};
