import { useCallback, useEffect, useRef } from "react";
import useVideo from "../../hook/useVideo";

export function InputRangeVideoCurrentTime({ showUI = true }) {
  const video = useVideo();
  const inputRangeVideoCurrentTimeRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoCurrentTimeRef.current) {
      inputRangeVideoCurrentTimeRef.current.value = 0.0;
    }
  }, []);
  const handleVideoCurrentTime = useCallback((value) => {
    // value -> Rango [0,1000]
    const valueNormalized = value / 1000.0 - 0.01; // -0.01 para evitar errores al llegar al valor maximo en la cancion
    if (video?.currentTime) {
      video.currentTime = valueNormalized * video.duration;
    }
  });

  return (
    <>
      <div
        id="div-input-video-currentTime"
        className="range"
        style={{
          display: showUI ? "block" : "none",
          position: "absolute",
          left: 30,
          bottom: 100 + 65,
          border: "none",
          borderRadius: "4px",
        }}
      >
        <input
          className="range1"
          type="range"
          ref={inputRangeVideoCurrentTimeRef}
          onChange={(e) => handleVideoCurrentTime(e.target.value)}
          min={1.0}
          max={1000.0}
          step={1}
          // value={0.0}
        ></input>
      </div>
    </>
  );
}
