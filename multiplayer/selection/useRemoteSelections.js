import { useCollaboratorsStore } from '@/stores/useCollaboratorsStore';

export const handleRemoteSelection = (userId, ids) => {
    useCollaboratorsStore.getState().setCollaborator(userId, {
        selection: ids,
    });
};
