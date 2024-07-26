import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

export default function CanvasDefault({
  style = { position: "absolute", top: "0", width: "100%", height: "100vh" },
  children
}) {
  return (
    <Canvas
      style={{ ...style, backgroundColor: "black" }}
      camera={{
        // position: cameraPosition,
        far: 9999999,
      }}
    >
      { children }

      {/* <Stats /> */}
    </Canvas>
  );
}