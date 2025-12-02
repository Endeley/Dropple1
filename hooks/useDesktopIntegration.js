"use client";

import { useEffect } from 'react';
import { desktopBridge } from '@/utils/desktopBridge';
import { usePagesStore } from '@/pagesystem/usePagesStore';

export const useDesktopIntegration = () => {
    const pages = usePagesStore((s) => s.pages);

    useEffect(() => {
        if (!desktopBridge.isDesktop) return undefined;

        const handleSave = async () => {
            await desktopBridge.saveProject({ pages });
        };

        const handleOpen = async () => {
            const data = await desktopBridge.openProject();
            if (data?.pages) {
                usePagesStore.setState({ pages: data.pages });
            }
        };

        const handleNew = () => {
            usePagesStore.setState({ pages: [] });
        };

        const disposers = [
            desktopBridge.on('app:save-project', handleSave),
            desktopBridge.on('app:open-project', handleOpen),
            desktopBridge.on('app:new-project', handleNew),
        ];

        return () => disposers.forEach((dispose) => dispose && dispose());
    }, [pages]);
};
