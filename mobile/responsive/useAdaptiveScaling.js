"use client";

import { useEffect } from 'react';

export const useAdaptiveScaling = (canvas, { isMobile, isTablet }) => {
    useEffect(() => {
        if (!canvas) return;
        const applyScale = () => {
            if (!canvas || typeof window === 'undefined') return;
            const baseWidth = canvas.getWidth() || 1;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const widthScale = viewportWidth / baseWidth;
            const heightScale = viewportHeight / canvas.getHeight();
            let scale = canvas.getZoom();

            if (isMobile) {
                scale = Math.min(widthScale, heightScale) * 0.95;
            } else if (isTablet) {
                scale = Math.min((viewportWidth - 200) / baseWidth, heightScale) * 0.98;
            } else {
                return;
            }

            canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
            canvas.setZoom(scale);
            canvas.requestRenderAll();
        };

        applyScale();
        window.addEventListener('resize', applyScale);
        return () => window.removeEventListener('resize', applyScale);
    }, [canvas, isMobile, isTablet]);
};
