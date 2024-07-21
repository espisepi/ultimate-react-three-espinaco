// store.js
import { create } from 'zustand';

const useScene1Store = create(set => ({

  showVideoPoints: true,
  showTextTessellation: false,
  showRollercoaster: true,

  setShowVideoPoints: (newShowVideoPoints) => set({ showVideoPoints: newShowVideoPoints }),
  setShowTextTessellation: (newTextTessellation) => set({ showTextTessellation: newTextTessellation }),
  setShowRollercoaster: (newShowRollercoaster) => set({ showRollercoaster: newShowRollercoaster }),
  
}));

export default useScene1Store;