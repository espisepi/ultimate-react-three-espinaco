import { useAppStore } from "../../store/AppStore";

export function ButtonChangeXRMode({ showButton = true }) {
    
  const xrmode = useAppStore((state) => state.xrmode);
  const setXrmode = useAppStore((state) => state.setXrmode);
  const handleChangeXRMode = () => {
    const newXrmode = !xrmode;
    setXrmode(newXrmode);
  };

  return (
    <>
      <button
        onClick={handleChangeXRMode}
        style={{
          // visibility: showMenuButton ? "visible" : "hidden",
          display: showButton ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          top: 350,
          right: 0,
          //   backgroundColor: "white",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: showButton ? 0.3 : 0.0,
          // cursor: showMenuButton ? "pointer" : "none",
          cursor: "pointer",
          color: "white",
        }}
      >
        VR
      </button>
    </>
  );
}
