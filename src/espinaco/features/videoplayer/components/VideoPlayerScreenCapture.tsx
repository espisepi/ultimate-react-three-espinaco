import React, { useRef, useEffect } from "react";

let isFirstTime = true;

export default function VideoPlayerScreenCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;

      async function getMedia() {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
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
          width: 300,
          height: 300,
        }}
      />
    </div>
  );
}
