// store.ts
import { create } from 'zustand';

export interface AppVideoPointsState {
  appId: number;
  xrmode: boolean;
  displayVideoplayer: boolean;
  setAppId: (newAppId: number) => void;
  setXrmode: (newXrmode: boolean) => void;
  setDisplayVideoPlayer: (newDisplayVideoPlayer: boolean) => void;
}

export const useAppVideoPointsStore = create<AppVideoPointsState>((set) => ({
  appId: 1,
  xrmode: false,
  displayVideoplayer: true,

  setAppId: (newAppId) => set({ appId: newAppId }),
  setXrmode: (newXrmode) => set({ xrmode: newXrmode }),
  setDisplayVideoPlayer: (newDisplayVideoPlayer) => set({ displayVideoplayer: newDisplayVideoPlayer }),
}));