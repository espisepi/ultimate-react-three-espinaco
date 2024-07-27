// store.ts
import { create } from 'zustand';

interface AppManagerState {
  appId: number;
  xrmode: boolean;
  displayVideoplayer: boolean;
  setAppId: (newAppId: number) => void;
  setXrmode: (newXrmode: boolean) => void;
  setDisplayVideoPlayer: (newDisplayVideoPlayer: boolean) => void;
}

const useAppManagerStore = create<AppManagerState>((set) => ({
  appId: 1,
  xrmode: false,
  displayVideoplayer: true,

  setAppId: (newAppId) => set({ appId: newAppId }),
  setXrmode: (newXrmode) => set({ xrmode: newXrmode }),
  setDisplayVideoPlayer: (newDisplayVideoPlayer) => set({ displayVideoplayer: newDisplayVideoPlayer }),
}));

export default useAppManagerStore;
