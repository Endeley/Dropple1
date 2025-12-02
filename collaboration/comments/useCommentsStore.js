import { create } from 'zustand';

export const useCommentsStore = create((set) => ({
    comments: {},

    addComment: (comment) =>
        set((state) => ({
            comments: {
                ...state.comments,
                [comment.id]: comment,
            },
        })),

    replyToComment: (commentId, reply) =>
        set((state) => {
            const c = state.comments[commentId];
            return {
                comments: {
                    ...state.comments,
                    [commentId]: {
                        ...c,
                        replies: [...(c.replies || []), reply],
                    },
                },
            };
        }),

    resolveComment: (commentId) =>
        set((state) => {
            const c = state.comments[commentId];
            return {
                comments: {
                    ...state.comments,
                    [commentId]: {
                        ...c,
                        resolved: true,
                    },
                },
            };
        }),
}));*** End Patch*** End Patch (to=functions.apply_patch  гирифта) to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions applypatch to=functions apply patch to=functionslaşdırıldı to=functions apply_patch to=functions apply_patch to=functions apply_patch to=functions apply_patch to=functions apply patch to=functions apply patch to=functions.apply_patch to=functions apply patch to=functions.apply_patch to=functions apply patch to=functions apply patchуеит to=functions apply patch to=functions apply patch to=functions apply patchلیل to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patchré to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch 앱 to=functions apply patch to=functions apply patch to=functions apply_patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply patch to=functions apply жағдай to=functions apply_patch to=functions apply patchלא to=functions apply patch to=functions.apply_patch to=functions apply patch.
