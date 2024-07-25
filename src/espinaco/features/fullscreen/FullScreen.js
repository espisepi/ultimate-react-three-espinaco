import { useCallback } from "react";
import { FullScreen as FullScreenLibrary, useFullScreenHandle } from "react-full-screen";

export default function FullScreen({ showButton = true, children }) {
  const handleFullScreen = useFullScreenHandle();
  const toggleFullScreen = useCallback(() => {
    if (handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  }, [handleFullScreen]);
  return (
    <>
      <FullScreenLibrary handle={handleFullScreen}>

        {children}

        <button
          onClick={toggleFullScreen}
          style={{
            display: showButton ? "block" : "none",
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            position: "absolute",
            bottom: "100px",
            right: "100px",
            //   backgroundColor: "#ff00ff",
            background: "linear-gradient(90deg, #636363 0%, #000000 100%)",
            opacity: 0.5,
            cursor: "pointer",
          }}
        ></button>

      </FullScreenLibrary>
    </>
  );
}
