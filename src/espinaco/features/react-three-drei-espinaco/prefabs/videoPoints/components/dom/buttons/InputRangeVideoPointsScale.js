import { useCallback, useEffect, useRef } from "react";

const DEFAULT_VIDEOPOINTS_SCALE = 1;

export default function InputRangeVideoPointsScale({ showUI = true }) {
  const inputRangeVideoPointsScaleRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoPointsScaleRef.current) {
      inputRangeVideoPointsScaleRef.current.value = DEFAULT_VIDEOPOINTS_SCALE;
    }
  }, [inputRangeVideoPointsScaleRef]);
  const handleVideoPointScale = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.scale.set(value, value, value);
    }
  }, []);

  return (
    <>
      <div
        id="div-input-range-video-point-scale"
        className="range"
        style={{
          display: showUI ? "block" : "none",
          position: "absolute",
          left: 30,
          bottom: 160 + 65,
          border: "none",
          borderRadius: "4px",
        }}
      >
        <input
          className="range1"
          type="range"
          ref={inputRangeVideoPointsScaleRef}
          onChange={(e) => handleVideoPointScale(e.target.value)}
          min={0.1}
          max={30.0}
          step={0.1}
          // value={0.0}
        ></input>
      </div>
    </>
  );
}
