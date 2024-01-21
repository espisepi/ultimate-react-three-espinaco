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

import { BoxVideo, BoxShader } from "../../prefabs/BoxCustom";
import VideoPoints from "../../prefabs/VideoPoints";
import { Suspense } from "react";

import GodCameraControls from "../../controls/GodCameraControls";
import { MusicVisualCubeReact } from "../../prefabs/musicVisualCube/MusicVisualCube";
import { SubtitleMesh } from "../../prefabs/subtitleMesh/SubtitleMesh";

// import { MeshSurfaceSampler } from '../prefabs/meshSurfaceSampler/MeshSurfaceSampler';

import { MemoryCardGame } from "../../games/memoryCardGame/MemoryCardGame";
import TextTesellation from "../../features/text-tesellation/TextTesellation";
import Minecraft from "../../features/minecraft/Minecraft";
import Screen from "../../prefabs/screen/Screen";
import FloorReflector from "../../prefabs/floor-reflector/FloorReflector";
import SphereCubeCamera from "../../prefabs/sphere-cubeCamera/SphereCubeCamera";
// import GBA from "../../features/gba-js-org/GBA";

// https://codesandbox.io/p/sandbox/volumetric-light-godray-yggpw5?file=%2Fsrc%2FApp.js

//TODO:
// Conectar a mi ip privada server y si no a la lista de canciones aws s3
// Quitar botones gba
// Terminar la escena scene2

export function Scene2() {
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

export default function Scene2Canvas({ style }) {
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
          <Scene2 />
        </Suspense>
        <GodCameraControls />
        <Stats />
      </Canvas>
    </>
  );
}
