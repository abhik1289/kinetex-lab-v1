import { create } from "zustand";

type TeamDialogState = {
  selectedTeamId: string | null;
  openForTeam: (teamId: string) => void;
  close: () => void;
};

export const useTeamDialogStore = create<TeamDialogState>((set) => ({
  selectedTeamId: null,
  openForTeam: (teamId) => set({ selectedTeamId: teamId }),
  close: () => set({ selectedTeamId: null }),
}));
