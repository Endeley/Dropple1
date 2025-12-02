import { create } from 'zustand';
import { getCursorColor } from './cursorColors';

export const usePresenceStore = create((set) => ({
    users: {},

    addUser: (user) =>
        set((state) => ({
            users: {
                ...state.users,
                [user.id]: {
                    ...user,
                    color: getCursorColor(user.id),
                    cursor: null,
                    selection: [],
                    activity: 'idle',
                },
            },
        })),

    updateUser: (userId, patch) =>
        set((state) => ({
            users: {
                ...state.users,
                [userId]: {
                    ...state.users[userId],
                    ...patch,
                },
            },
        })),

    updateCursor: (userId, cursor) =>
        set((state) => ({
            users: {
                ...state.users,
                [userId]: {
                    ...state.users[userId],
                    cursor,
                },
            },
        })),

    updateSelection: (userId, selection) =>
        set((state) => ({
            users: {
                ...state.users,
                [userId]: {
                    ...state.users[userId],
                    selection,
                },
            },
        })),

    removeUser: (userId) =>
        set((state) => {
            const copy = { ...state.users };
            delete copy[userId];
            return { users: copy };
        }),
}));
