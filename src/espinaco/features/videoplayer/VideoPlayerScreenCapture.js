import React, { useRef, useEffect } from "react";

let isFirstTime = true;

// TODO: Aqui funciona un streaming con audio analyser
// https://jsfiddle.net/jib1/2w5z67hn/
// poner el <video muted> para que no se escuche el audio dos veces, solo en la ventana que se esta capturando

export default function VideoPlayerScreenCapture() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;

      async function getMedia() {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error("Error accessing record:", error);
        }
      }
      getMedia();
    }
  }, []);

  return (
    <div style={{ position: "absolute", top: 0 }}>
      <h1>Webcam Stream</h1>
      <video
        id="video"
        ref={videoRef}
        autoPlay
        playsInline
        controls
        style={{
          //   display: "none",
          width: 300,
          height: 300,
        }}
      />
    </div>
  );
}
