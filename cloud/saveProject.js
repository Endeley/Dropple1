import { useCloudStore } from './useCloudStore';
import { usePagesStore } from '@/pagesystem/usePagesStore';

export const saveProject = async () => {
    const { projectId } = useCloudStore.getState();
    if (!projectId) return;

    useCloudStore.getState().setSaving(true);

    const pages = usePagesStore.getState().pages;

    const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages, updatedAt: Date.now() }),
    });

    if (res.ok) {
        useCloudStore.getState().setSaving(false);
        useCloudStore.getState().setLastSaved(Date.now());
    }
};
