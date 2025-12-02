"use client";

import { useState } from 'react';

export const useTemplatePurchase = () => {
    const [status, setStatus] = useState('idle');

    const purchase = async (templateId) => {
        setStatus('loading');
        try {
            const res = await fetch('/api/marketplace/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateId }),
            });
            if (!res.ok) throw new Error('Purchase failed');
            setStatus('success');
            return await res.json();
        } catch (err) {
            setStatus('error');
            throw err;
        }
    };

    return { purchase, status };
};
