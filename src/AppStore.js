// store.js
import { create } from 'zustand';

const useAppStore = create(set => ({
  appId: 0,
  setAppId: (newAppId) => set({ appId: newAppId }),
}));

export default useAppStore;