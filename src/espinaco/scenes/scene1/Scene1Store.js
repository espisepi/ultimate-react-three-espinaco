// store.js
import { create } from 'zustand';

const useScene1Store = create(set => ({

  showVideoPoints: true,
  showTextTessellation: true,
  showRollercoaster: true,
  showGBA: false,

  setShowVideoPoints: (newShowVideoPoints) => set({ showVideoPoints: newShowVideoPoints }),
  setShowTextTessellation: (newTextTessellation) => set({ showTextTessellation: newTextTessellation }),
  setShowRollercoaster: (newShowRollercoaster) => set({ showRollercoaster: newShowRollercoaster }),
  setShowGBA: (newShowGBA) => set({ showGBA: newShowGBA }),

  
}));

export default useScene1Store;