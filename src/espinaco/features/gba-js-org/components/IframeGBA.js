import * as THREE from "three";
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

export default function IframeGBA() {
  return (
    <>
      <hemisphereLight groundColor="red" />
      <Float floatIntensity={10} rotationIntensity={4}>
        <Html
          style={{ userSelect: "none" }}
          castShadow
          receiveShadow
          occlude="blending"
          transform
        >
          <iframe
            title="embed"
            width={700}
            height={500}
            src="https://threejs.org/"
            frameBorder={0}
          />
        </Html>
      </Float>
    </>
  );
}
