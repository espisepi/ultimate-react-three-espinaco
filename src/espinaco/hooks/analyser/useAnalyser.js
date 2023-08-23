import React, { useState, useEffect } from "react";
import Analyser from "./Analyser";
import AnalyserStreaming from "./AnalyserStreaming";

// Importante hacer en el video que nos llega por parametro lo siguiente si se trata de un streaming
//     const stream = await navigator.mediaDevices.getDisplayMedia({
//   video: true,
//   audio: true,
// });
// videoRef.current.srcObject = stream; // videoRef.current : HTMLVideoElement

export default function useAnalyser(
  video,
  isVideoStream = false, // tener en cuenta que para que sea videoStream tiene que existir el codigo de arriba
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
      let analyser;
      if (isVideoStream) {
        analyser = new AnalyserStreaming(video, fftSize);
      } else {
        analyser = new Analyser(video, fftSize);
      }
      console.log(analyser);
      setAnalyser((v) => analyser);
    }
  }, [video, isVideoStream]);

  return analyser;
}
