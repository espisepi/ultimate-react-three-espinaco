
export interface UIMenu1Props {
    display: boolean;
}

export const UIMenu1 = ({ display = true }: UIMenu1Props) => {
  return (
    <>
      <div className={`menu-container menu-1 ${ display ? 'active' : '' }`}>
        <button className="menu-button button-style icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M280.37 148.26L96 300.11V464a16 16 0 0016 16l112-.29a16 16 0 0016-16V368a16 16 0 0116-16h64a16 16 0 0116 16v95.72a16 16 0 0016 16l112 .29a16 16 0 0016-16V300L295.67 148.26a12 12 0 00-15.3 0zM573.32 268.35L488 197.8V44a12 12 0 00-12-12h-72a12 12 0 00-12 12v72.61L318.47 43.19c-11.7-9.44-28.57-9.44-40.27 0L2.67 268.35a12 12 0 00-1.6 16.9l25.5 31.1a12 12 0 0016.9 1.6l235.4-190.53a12 12 0 0115.3 0l235.4 190.53a12 12 0 0016.9-1.6l25.5-31.1a12 12 0 00-1.65-16.9z" />
          </svg>
          Abrir menu 1
        </button>
        <button className="menu-button icon-container">Esconder botones</button>
        <button className="menu-button icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
          Abrir menu 2
        </button>
      </div>
    </>
  );
};
