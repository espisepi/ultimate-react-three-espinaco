import { useAppStore } from "../../../../../../app-module/store/AppStore";
import useControlsManagerStore from "../../store/ControlsManagerStore";
import useControlsManagerXRStore from "../../store/ControlsManagerXRStore";

export default function ButtonChangeControls({ showButton = true }) {

  // AppStore =================================
  const xrmode = useAppStore((state) => state.xrmode);

  // ControlsManagerStore =========================================
  const controlsId = useControlsManagerStore((state) => state.controlsId);
  const setControlsId = useControlsManagerStore((state) => state.setControlsId);
  const maxNumControls = useControlsManagerStore(
    (state) => state.maxNumControls
  );

  // ControlsManagerXRStore =========================================
  const controlsXRId = useControlsManagerXRStore((state) => state.controlsXRId);
  const setControlsXRId = useControlsManagerXRStore(
    (state) => state.setControlsXRId
  );
  const maxNumControlsXR = useControlsManagerXRStore(
    (state) => state.maxNumControlsXR
  );

  // Onclick button function
  const handleChangeControl = () => {
    if (xrmode) {
      const newControlsXRId = (controlsXRId + 1) % maxNumControlsXR;
      setControlsXRId(newControlsXRId);
    } else {
      const newControlsId = (controlsId + 1) % maxNumControls;
      setControlsId(newControlsId);
    }
  };

  return (
    <>
      <button
        onClick={handleChangeControl}
        style={{
          // visibility: showMenuButton ? "visible" : "hidden",
          display: showButton ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          top: 280,
          right: 0,
          //   backgroundColor: "white",
          background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
          opacity: showButton ? 0.3 : 0.0,
          // cursor: showMenuButton ? "pointer" : "none",
          cursor: "pointer",
          color: "white",
        }}
      >
        Control
      </button>
    </>
  );
}
