// store.js
import { create } from 'zustand';

const useControlsManagerXRStore = create(set => ({

  controlsXRId: 1,
  maxNumControlsXR: 3, // only read attribute // Poner aqui el numero de controles maximos que haya creado

  setControlsXRId: (newControlsXRId) => set({ controlsXRId: newControlsXRId }),
  
}));

export default useControlsManagerXRStore;