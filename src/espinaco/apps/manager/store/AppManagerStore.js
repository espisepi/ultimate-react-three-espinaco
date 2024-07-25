// store.js
import { create } from 'zustand';

const useAppManagerStore = create(set => ({

  appId: 1,
  xrmode: false,
  displayVideoplayer: true,

  setAppId: (newAppId) => set({ appId: newAppId }),
  setXrmode: (newXrmode) => set({ xrmode: newXrmode }),
  setDisplayVideoPlayer: (newDisplayVideoPlayer) => set({ displayVideoplayer: newDisplayVideoPlayer }),

  
}));

export default useAppManagerStore;