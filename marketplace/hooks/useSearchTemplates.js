"use client";

import { useEffect } from 'react';
import { useMarketplaceStore } from '../store/useMarketplaceStore';

export const useSearchTemplates = () => {
    const { filters, setTemplates, setLoading } = useMarketplaceStore();

    useEffect(() => {
        let active = true;
        const params = new URLSearchParams(filters);
        setLoading(true);
        fetch(`/api/marketplace/list?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => active && setTemplates(data))
            .finally(() => active && setLoading(false));

        return () => {
            active = false;
        };
    }, [filters, setLoading, setTemplates]);
};
