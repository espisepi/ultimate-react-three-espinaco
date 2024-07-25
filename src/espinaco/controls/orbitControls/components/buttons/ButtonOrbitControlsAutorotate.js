import { useCallback } from "react";

export default function ButtonOrbitControlsAutorotate({ showButton = true }) {
 
     const handleAutoRotate = useCallback(() => {
    if (window.orbitControls) {
      window.orbitControls.autoRotate = !window.orbitControls.autoRotate;
    }
  }, []);

  return (
    <>
        <button
          onClick={handleAutoRotate}
          style={{
            display: showButton ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "190px",
            //   backgroundColor: "#ffff00",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
            cursor: "pointer",
            color: "white"
          }}
        >
          Rotate
        </button>

    </>
  );
}
