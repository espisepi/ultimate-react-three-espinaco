// store.js
import { create } from 'zustand';

const useAppStore = create(set => ({

  appId: 1,
  xrmode: true,

  setAppId: (newAppId) => set({ appId: newAppId }),
  setXrmode: (newXrmode) => set({ xrmode: newXrmode }),
  
}));

export default useAppStore;