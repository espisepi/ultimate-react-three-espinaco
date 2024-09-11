import { ScreenID, useUIStore } from "../store/UIStore";

export const UIPage1 = () => {
  // Ver el estado de las pantallas
  const { screen1, screen2, screen3 } = useUIStore(
    (state) => state.screens,
  );

  // Modificar el estado de las pantallas
  const setVisibleScreen = useUIStore((state) => state.setVisibleScreen);

  // Activa la pantalla 1
  const toggleActivateScreen1 = () => {
    setVisibleScreen(ScreenID.Screen1, !screen1);
  };

  // Activa la pantalla 2
  const toggleActivateScreen2 = () => {
    setVisibleScreen(ScreenID.Screen2, !screen2);
  };

  // Activa la pantalla 3
  const toggleActivateScreen3 = () => {
    setVisibleScreen(ScreenID.Screen3, !screen3);
  };

  return (
    <>
      <div className={`menu-container menu-1 ${screen1 ? "active" : ""}`}>
        <button
          className="menu-button button-style icon-container"
          onClick={() => toggleActivateScreen2()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
          {/* Abrir menu 1 */}
        </button>
        <button
          className="menu-button icon-container"
          onClick={() => toggleActivateScreen1()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
          {/* Esconder botones */}
        </button>
        <button
          className="menu-button icon-container"
          onClick={() => toggleActivateScreen3()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
          {/* Abrir menu 2 */}
        </button>
      </div>
    </>
  );
};
