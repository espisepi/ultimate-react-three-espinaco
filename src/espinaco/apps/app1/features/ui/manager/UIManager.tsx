import React from "react";
import { UIMenu1 } from "../components/UIMenu1";
import useUIManagerStore, { ScreenID } from "../store/UIManagerStore";

export const UIManager = () => {

  // Ver el estado de las pantallas
  const screenStates = useUIManagerStore((state) => state.screens);
  const { screen1 } = screenStates;
  const { screen2 } = screenStates;
  const { screen3 } = screenStates;

  // Modificar el estado de las pantallas
  const setActiveScreen = useUIManagerStore((state) => state.setActiveScreen);

  // Activa la pantalla 1
  const activateScreen1 = () => {
    setActiveScreen(ScreenID.Screen1);
  };

  // Activa la pantalla 2
  const activateScreen2 = () => {
    setActiveScreen(ScreenID.Screen2);
  };

  // Activa la pantalla 3
  const activateScreen3 = () => {
    setActiveScreen(ScreenID.Screen3);
  };

  return (
    <>
      <UIMenu1 visibility={screen1} />

      <div className="menu-container menu-2">
        <h1>OYEEEEEEEEEE</h1>
      </div>

      <div className="menu-container menu-3">
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
