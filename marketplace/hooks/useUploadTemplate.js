"use client";

import { useState } from 'react';

export const useUploadTemplate = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const upload = async (formData) => {
        try {
            setUploading(true);
            setError(null);
            const res = await fetch('/api/marketplace/create', {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            return await res.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    return { upload, uploading, error };
};
