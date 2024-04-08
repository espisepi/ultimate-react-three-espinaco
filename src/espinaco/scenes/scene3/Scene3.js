import React, { useCallback, useEffect, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Stars,
  CubeCamera,
  Float,
  MeshReflectorMaterial,
  Stats,
} from "@react-three/drei";

import { Suspense } from "react";

import GodCameraControls from "../../controls/GodCameraControls";
import Screen from "../../prefabs/screen/Screen";

// https://codesandbox.io/p/sandbox/building-dynamic-envmaps-e662p3?file=%2Fsrc%2FLamborghini.js%3A31%2C12

export function Scene3() {
  const starsRef = useRef();
  useEffect(() => {
    if (starsRef.current) {
      window.stars = starsRef.current;

      window.stars.isRotating = true;
    }
  }, [starsRef.current]);
  useFrame(({ clock }) => {
    // Stars Rotating
    if (!window?.orbitControls?.autoRotate) {
      if (window?.stars?.isRotating) {
        window.stars.rotation.set(
          window.stars.rotation.x,
          clock.elapsedTime * 0.03,
          window.stars.rotation.z
        );
      }
    }
  });
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight />

      {/* <VideoPoints /> */}

      {/** The screen uses postpro godrays */}
      <Screen />

      {/** The sphere reflects the screen with a cube-cam */}
      {/* <SphereCubeCamera /> */}

      {/** The floor uses drei/MeshReflectorMaterial */}
      {/* <FloorReflector /> */}

      {/* <TextTesellation text="Sepinaco" position={[0, 0, 0]} /> */}

      <Stars
        ref={starsRef}
        radius={1000}
        count={1999}
        depth={400}
        factor={55}
        fade /* speed={1} */
        /* saturation={1} */
      />
    </>
  );
}

export default function Scene3Canvas({ style }) {
  return (
    <>
      <Canvas
        style={{ ...style, backgroundColor: "black" }}
        camera={{
          position: [0, 0, 30],
          far: 9999999,
        }}
      >
        <Suspense
          fallback={<Box material-color="red" material-wireframe="true" />}
        >
          <Scene3 />
        </Suspense>
        <GodCameraControls />
        <Stats />
      </Canvas>
    </>
  );
}
