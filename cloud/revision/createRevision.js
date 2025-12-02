import { usePagesStore } from '@/pagesystem/usePagesStore';
import { useRevisionStore } from './useRevisionStore';

export const createRevision = async (label = null) => {
    const pages = usePagesStore.getState().pages;

    const rev = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        label: label || `Autosave ${new Date().toLocaleTimeString()}`,
        pages: JSON.parse(JSON.stringify(pages)),
    };

    useRevisionStore.getState().addRevision(rev);
    return rev;
};
