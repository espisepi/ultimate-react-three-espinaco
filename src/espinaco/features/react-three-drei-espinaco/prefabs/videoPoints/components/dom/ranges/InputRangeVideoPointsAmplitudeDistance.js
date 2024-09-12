import { useCallback, useEffect, useRef } from "react";


const DEFAULT_VIDEOPOINTS_AMPLITUDEDISTANCE = 1.0;

export default function InputRangeVideoPointsAmplitudeDistance({
  showUI = true,
}) {
  const inputRangeVideoPointsAmplitudeDistanceRef = useRef(null);
  useEffect(() => {
    if (inputRangeVideoPointsAmplitudeDistanceRef.current) {
      inputRangeVideoPointsAmplitudeDistanceRef.current.value =
        DEFAULT_VIDEOPOINTS_AMPLITUDEDISTANCE;
    }
  }, [inputRangeVideoPointsAmplitudeDistanceRef]);
  // Modificar el inputRange
  const handleVideoPointAmplitudeDistance = useCallback((value) => {
    if (window.videoPoints) {
      window.videoPoints.material.uniforms.amplitudeDistance.value = value;
    }
  }, []);
  return (
    <>
      <div
        id="div-input-range-video-point-amplitude-distance"
        className="range"
        style={{
          display: showUI ? "block" : "none",
          position: "absolute",
          left: 30,
          bottom: 220 + 65,
          border: "none",
          borderRadius: "4px",
        }}
      >
        <input
          className="range1"
          type="range"
          ref={inputRangeVideoPointsAmplitudeDistanceRef}
          onChange={(e) => handleVideoPointAmplitudeDistance(e.target.value)}
          min={-9000.0}
          max={9000.0}
          step={1}
          // value={0.0}
        ></input>
      </div>
    </>
  );
}
