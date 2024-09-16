import { useAppVideoPointsStore } from "../../store/AppVideoPointsStore";

interface ButtonChangeXRModeProps {
  showButton?: boolean;
}

export function ButtonChangeXRMode({ showButton = true }: ButtonChangeXRModeProps) {
  const xrmode = useAppVideoPointsStore((state) => state.xrmode);
  const setXrmode = useAppVideoPointsStore((state) => state.setXrmode);

  const handleChangeXRMode = () => {
    const newXrmode = !xrmode;
    setXrmode(newXrmode);
  };

  return (
    <>
      <button
        onClick={handleChangeXRMode}
        style={{
          display: showButton ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          top: 350,
          right: 0,
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: showButton ? 0.3 : 0.0,
          cursor: "pointer",
          color: "white",
        }}
      >
        VR
      </button>
    </>
  );
}
