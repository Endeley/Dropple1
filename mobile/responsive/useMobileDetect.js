"use client";

import { useEffect, useState } from 'react';

export const useMobileDetect = () => {
    const [state, setState] = useState({ isMobile: false, isTablet: false });

    useEffect(() => {
        const compute = () => {
            if (typeof window === 'undefined') return;
            const width = window.innerWidth;
            setState({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
            });
        };

        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, []);

    return state;
};
