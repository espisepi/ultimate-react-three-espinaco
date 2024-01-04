import * as THREE from "three";
import { useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Box, Float, Html } from "@react-three/drei";

export default function IframeGBA({
  visible = true,
  remove = false,
  occludeBlending = true,
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
              style={
                visible
                  ? {}
                  : { position: "absolute", width: 0, height: 0, border: 0 }
              }
              title="embed"
              width={1366}
              height={1024}
              src="https://gba.js.org/"
              frameBorder={0}
            />
          </Html>
        </group>
      )}
    </>
  );
}
