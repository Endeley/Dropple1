import { create } from 'zustand';

export const useTeamStore = create((set) => ({
    currentTeam: null,
    teams: [],
    members: [],

    setTeams: (teams) => set({ teams }),
    setCurrentTeam: (team) => set({ currentTeam: team }),
    setMembers: (members) => set({ members }),
}));
