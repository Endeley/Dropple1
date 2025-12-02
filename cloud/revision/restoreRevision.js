import { usePagesStore } from '@/pagesystem/usePagesStore';
import { useRevisionStore } from './useRevisionStore';

export const restoreRevision = (revisionId) => {
    const rev = useRevisionStore.getState().revisionList.find((r) => r.id === revisionId);
    if (!rev) return;

    usePagesStore.setState({ pages: rev.pages });
};
