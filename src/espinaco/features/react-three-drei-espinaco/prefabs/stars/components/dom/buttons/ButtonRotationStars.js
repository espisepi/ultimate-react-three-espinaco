import { useCallback } from "react";

export default function ButtonRotationStars({ showUI = true }) {
  const handleRotationStars = useCallback(() => {
    if (window.stars) {
      window.stars.isRotating = !window.stars.isRotating;
    }
  }, []);
  return (
    <>
      <button
        onClick={handleRotationStars}
        style={{
          display: showVideo ? "block" : "none",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "absolute",
          bottom: "100px",
          right: "150px",
          //   backgroundColor: "#ffff00",
          background: "linear-gradient(90deg, #0cb300 0%, #000000 100%)",
          opacity: 0.5,
        }}
      >
        {" "}
      </button>
    </>
  );
}
