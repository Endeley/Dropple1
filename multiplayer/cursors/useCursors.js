import { useCollaboratorsStore } from '@/stores/useCollaboratorsStore';

export const handleCursorUpdate = (userId, position) => {
    useCollaboratorsStore.getState().setCollaborator(userId, {
        cursor: position,
    });
};
