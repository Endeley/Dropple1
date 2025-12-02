import { usePagesStore } from '@/pagesystem/usePagesStore';
import { useCloudStore } from './useCloudStore';

export const loadProject = async (projectId) => {
    const res = await fetch(`/api/projects/${projectId}`);
    const data = await res.json();

    useCloudStore.getState().setProjectId(projectId);
    useCloudStore.getState().setProjectData(data);

    data.pages.forEach((p) => {
        usePagesStore.getState().addPage(p);
    });

    return data;
};
