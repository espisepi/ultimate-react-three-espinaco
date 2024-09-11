// store.ts
import { create } from "zustand";

interface ScreenState {
  screens: { [key: string]: boolean }; // Un objeto donde las claves son los IDs de las pantallas
  setActiveScreen: (id: string) => void;
}

const useUIManagerStore = create<ScreenState>((set) => ({
  screens: {
    screen1: true,
    screen2: false,
    screen3: false,
    // Agrega más pantallas si es necesario
  },

  setActiveScreen: (id: string) =>
    set((state) => ({
      screens: {
        ...state.screens,
        [id]: true, // Activa solo el id especificado
      },
    })),
}));

export default useUIManagerStore;
