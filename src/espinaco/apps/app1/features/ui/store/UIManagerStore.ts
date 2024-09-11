import { create } from "zustand";

// Definimos el enumerado para los IDs de pantalla
export enum ScreenID {
  Screen1 = "screen1",
  Screen2 = "screen2",
  Screen3 = "screen3",
  // Agrega más pantallas aqui si es necesario
}

interface ScreenState {
  screens: { [key in ScreenID]: boolean }; // Tipado dinamico con el enum
  // setActiveScreen: (id: ScreenID) => void;
  // setDesactiveScreen: (id: ScreenID) => void;
  setVisibleScreen: (id: ScreenID, isVisible: boolean) => void;
}

const useUIManagerStore = create<ScreenState>((set) => ({
  screens: {
    [ScreenID.Screen1]: true,
    [ScreenID.Screen2]: false,
    [ScreenID.Screen3]: false,
    // Si agregas mas pantallas, anadelas aqui tambien
  },

  // setActiveScreen: (id: ScreenID) =>
  //   set((state) => ({
  //     screens: {
  //       ...state.screens,
  //       [id]: true, // Activamos la pantalla usando el enum
  //     },
  //   })),

  // setDesactiveScreen: (id: ScreenID) =>
  //   set((state) => ({
  //     screens: {
  //       ...state.screens,
  //       [id]: false, // Desactivamos la pantalla usando el enum
  //     },
  //   })),

  setVisibleScreen: (id: ScreenID, isVisible: boolean) =>
    set((state) => ({
      screens: {
        screen1: id == ScreenID.Screen1 ? isVisible : true, // Por defecto es true porque los botones de la screen1 controlan las demas screen y tienen que aparecer siempre
        screen2: id == ScreenID.Screen2 ? isVisible : false, // Por defecto es false para que no se muestre si se selecciona otro screen
        screen3: id == ScreenID.Screen3 ? isVisible : false, // idem anterior
      },
    })),
}));

export default useUIManagerStore;

// Codigo sin usar enumerado

// import { create } from "zustand";

// interface ScreenState {
//   screens: { [key: string]: boolean }; // Un objeto donde las claves son los IDs de las pantallas
//   setActiveScreen: (id: string) => void;
// }

// const useUIManagerStore = create<ScreenState>((set) => ({
//   screens: {
//     screen1: true,
//     screen2: false,
//     screen3: false,
//     // Agrega más pantallas si es necesario
//   },

//   setActiveScreen: (id: string) =>
//     set((state) => ({
//       screens: {
//         ...state.screens,
//         [id]: true, // Activa solo el id especificado
//       },
//     })),
// }));

// export default useUIManagerStore;
