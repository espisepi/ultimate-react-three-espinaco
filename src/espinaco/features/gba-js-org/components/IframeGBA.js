import * as THREE from "three";
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

export default function IframeGBA() {
  return (
    <>
      <Html occlude="blending" transform distanceFactor={100}>
        <iframe
          title="embed"
          width={1366}
          height={1024}
          src="https://gba.js.org/"
          frameBorder={0}
        />
      </Html>
    </>
  );
}
