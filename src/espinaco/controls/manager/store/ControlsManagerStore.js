// store.js
import { create } from 'zustand';

const useControlsManagerStore = create(set => ({

  controlsId: 3,
  maxNumControls: 4, // only read attribute // Poner aqui el numero de controles maximos que haya creado

  setControlsId: (newControlsId) => set({ controlsId: newControlsId }),
  
}));

export default useControlsManagerStore;