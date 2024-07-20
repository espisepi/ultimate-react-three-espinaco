// store.js
import { create } from 'zustand';

const useControlsStore = create(set => ({

  controlsId: 1,
  maxNumControls: 2, // only read attribute // Poner aqui el numero de controles maximos que haya creado

  setControlsId: (newControlsId) => set({ controlsId: newControlsId }),
  
}));

export default useControlsStore;