import React, { useState, useEffect } from "react";
import Analyser from "./Analyser";

export default function useAnalyser(
  video,
  elementId = "video",
  fftSize = 2048
) {
  const [analyser, setAnalyser] = useState();
  //   useEffect(() => {
  //     if (elementId) {
  //       const audio = document.getElementById(elementId);
  //       console.log("OYEEEEE");
  //       console.log(audio);
  //       const analyser = new Analyser(audio, fftSize);
  //       setAnalyser((v) => analyser);
  //     }
  //   }, [elementId, fftSize]);
  useEffect(() => {
    if (video) {
      const analyser = new Analyser(video, fftSize);
      console.log(analyser);
      setAnalyser((v) => analyser);
    }
  }, [video]);

  return analyser;
}
