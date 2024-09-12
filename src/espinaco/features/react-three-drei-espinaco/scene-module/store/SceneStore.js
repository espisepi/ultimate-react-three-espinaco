// store.js
import { create } from 'zustand';

export const useSceneStore = create(set => ({

  sceneId: 0,
  maxNumScenes: 2, // only read attribute // Poner aqui el numero de controles maximos que haya creado

  setSceneId: (newSceneId) => set({ sceneId: newSceneId }),
  
}));