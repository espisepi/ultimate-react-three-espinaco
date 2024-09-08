import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, Float, Html } from "@react-three/drei";
import useIframeCanvas from "../hooks/useIframeCanvas";

export default function IframeGBA({
  visible = true,
  remove = false,
  occludeBlending = true,
  displayTextureGbaGame = true,
}) {
  const { camera } = useThree();
  const [cameraInitialPosition] = useState(camera.position.clone());
  const restoreCameraPosition = () => {
    camera.position.set(
      cameraInitialPosition.x,
      cameraInitialPosition.y,
      cameraInitialPosition.z
    );
  };

  const canvasIframe = useIframeCanvas();
  const [videoPoints, setVideoPoints] = useState();
  const [canvasTexture, setCanvasTexture] = useState();
  const [videoTexture, setVideoTexture] = useState();
  useEffect(() => {
    if (canvasIframe) {
      // console.log({ canvasIframe });
      // console.log({ videoPoints: window.videoPoints });
      // Obtenemos el objeto videoPoints
      const videoPoints = window.videoPoints;
      setVideoPoints(videoPoints);
      // Obtenemos el video texture de por si aka (acaso) lo queremos volver a poner
      const videoTexture = videoPoints.material.uniforms.iChannel0.value;
      setVideoTexture(videoTexture);
      // Reemplazamos la textura del videoclip por el canvas
      const canvasTexture = new THREE.CanvasTexture(canvasIframe);
      canvasTexture.needsUpdate = true;
      videoPoints.material.uniforms.iChannel0.value = canvasTexture;
      videoPoints.material.needsUpdate = true;
      setCanvasTexture(canvasTexture);
    }
  }, [canvasIframe]);
  useFrame(() => {
    if (displayTextureGbaGame && videoPoints && canvasTexture) {
      // TODO: Optimizar esta parte para no crear canvasTexture todo el tiempo
      const canvasTexture = new THREE.CanvasTexture(canvasIframe);
      videoPoints.material.uniforms.iChannel0.value = canvasTexture;
    } else if (!displayTextureGbaGame && videoTexture) {
      videoPoints.material.uniforms.iChannel0.value = videoTexture;
    }
  });
  return (
    <>
      {remove ? null : (
        <group position={[0, 0, 0]}>
          <Html
            occlude={occludeBlending ? "blending" : ""}
            transform
            distanceFactor={100}
          >
            <button
              onPointerDown={restoreCameraPosition}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.2,
                backgroundColor: "#3d1766",
                height: visible ? "5rem" : 0,
                width: visible ? "5rem" : 0,
                borderRadius: "25px",
              }}
            ></button>
            <iframe
              id="iframe-gba"
              style={
                visible
                  ? {}
                  : { position: "absolute", width: 0, height: 0, border: 0 }
              }
              title="embed"
              width={1366}
              height={1024}
              src="/gbajs/index.html"
              frameBorder={0}
            />
          </Html>
        </group>
      )}
    </>
  );
}
