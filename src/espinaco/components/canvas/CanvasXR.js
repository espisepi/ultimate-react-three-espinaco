import React from "react";
import { Canvas } from "@react-three/fiber";
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'

export default function CanvasXR({
  style = { position: "absolute", top: "0", width: "100%", height: "100vh" },
  children
}) {
    return (
     <>
      <VRButton style={{
            top: 0,
            height: "5rem",
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 24px",
            border: "1px solid white",
            borderRadius: "4px",
            background: "rgba(0, 0, 0, 0.1)",
            color: "white",
            font: "0.8125rem sans-serif",
            outline: "none",
            zIndex: 99999,
            cursor: "pointer",
      }} />
      <Canvas style={{ ...style, backgroundColor: "black" }}>
        <XR>
          <Controllers />
          <Hands />
          { children }
        </XR>
      </Canvas>
    </>
  );
}