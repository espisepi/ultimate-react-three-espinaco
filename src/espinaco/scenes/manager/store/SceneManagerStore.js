// store.js
import { create } from 'zustand';

const useSceneManagerStore = create(set => ({

  sceneId: 0,
  maxNumScenes: 2, // only read attribute // Poner aqui el numero de controles maximos que haya creado

  setSceneId: (newSceneId) => set({ sceneId: newSceneId }),
  
}));

export default useSceneManagerStore;