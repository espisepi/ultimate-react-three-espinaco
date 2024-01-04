import * as THREE from "three";
import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, Float, Html } from "@react-three/drei";

export default function IframeGBA() {
  return (
    <>
      <group position={[0, 0, 0]}>
        <Html occlude="blending" transform distanceFactor={100}>
          <button
            onPointerDown={(ev) => alert("holi")}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.2,
              backgroundColor: "#3d1766",
              height: "5rem",
              width: "5rem",
              borderRadius: "25px",
            }}
          ></button>
          <iframe
            title="embed"
            width={1366}
            height={1024}
            src="https://gba.js.org/"
            frameBorder={0}
          />
        </Html>
      </group>
    </>
  );
}
