import { create } from 'zustand';

export const usePresenceStore = create((set) => ({
    users: {},
    cursors: {},

    updateUser: (id, data) =>
        set((state) => ({
            users: {
                ...state.users,
                [id]: { ...(state.users[id] || {}), ...data },
            },
        })),

    updateCursor: (id, position) =>
        set((state) => ({
            cursors: {
                ...state.cursors,
                [id]: position,
            },
        })),

    removeUser: (id) =>
        set((state) => {
            const users = { ...state.users };
            const cursors = { ...state.cursors };
            delete users[id];
            delete cursors[id];
            return { users, cursors };
        }),
}));
