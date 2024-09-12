import { useCallback, useEffect, useRef } from "react";

const DEFAULT_VIDEOPOINTS_POINTSSIZE = 1.5; //Mirar este valor en VideoPointsShader.js -> pointSize: { type: "f", value: 1.5 },

export default function InputRangeVideoPointsSize({ showUI = true }) {
  const inputRangeVideoPointsSizeRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoPointsSizeRef.current) {
      inputRangeVideoPointsSizeRef.current.value =
        DEFAULT_VIDEOPOINTS_POINTSSIZE;
    }
  }, [inputRangeVideoPointsSizeRef]);
  // Modificar el inputRange
  const handleVideoPointSize = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.material.uniforms.pointSize.value = value;
    }
  }, []);

  return (
    <>
      <div
        id="div-input-range-video-point-size"
        className="range"
        style={{
          display: showUI ? "block" : "none",
          position: "absolute",
          left: 30,
          bottom: 190 + 65,
          border: "none",
          borderRadius: "4px",
        }}
      >
        <input
          className="range1"
          type="range"
          ref={inputRangeVideoPointsSizeRef}
          onChange={(e) => handleVideoPointSize(e.target.value)}
          min={0.1}
          max={30.0}
          step={0.1}
          // value={0.0}
        ></input>
      </div>
    </>
  );
}
