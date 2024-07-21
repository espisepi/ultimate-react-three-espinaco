import React, { useCallback, useEffect, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Stars } from "@react-three/drei";

import { BoxVideo, BoxShader } from "../../prefabs/BoxCustom";
import VideoPoints from "../../prefabs/VideoPoints";
import { Suspense } from "react";

import GodCameraControls from "../../controls/god/GodCameraControls";
import { MusicVisualCubeReact } from "../../prefabs/musicVisualCube/MusicVisualCube";
import { SubtitleMesh } from "../../prefabs/subtitleMesh/SubtitleMesh";

// import { MeshSurfaceSampler } from '../prefabs/meshSurfaceSampler/MeshSurfaceSampler';

import { MemoryCardGame } from "../../games/memoryCardGame/MemoryCardGame";
import TextTessellation from "../../prefabs/text-tesellation/TextTessellation";
import Minecraft from "../../features/minecraft/Minecraft";
import Ocean from "../../prefabs/ocean/Ocean";
import Rollercoaster from "../../controls/rollercoaster/Rollercoaster";
import useAppStore from "../../apps/store/AppStore";
import { Scene } from "three";
import PerformanceText from "../../prefabs/debug/performanceText/PerformanceText";
import CameraInfoText from "../../prefabs/debug/cameraInfoText/CameraInfoText";
import XRInfoText from "../../prefabs/debug/xrInfoText/XRInfoText";
import useScene1Store from "./Scene1Store";
// import GBA from "../../features/gba-js-org/GBA";

// Coger efectos de codrops
// Mezclar esos dos efectos para soto asa videoclip
// https://tympanus.net/Tutorials/text-trail-effect/
// https://tympanus.net/codrops/2021/08/31/surface-sampling-in-three-js/
// https://tympanus.net/Tutorials/SurfaceSampling/index3.html
// Para efectos de letras: https://tympanus.net/Development/3DTypeEffects/03_flowers.html

// dataRotation (individual for each song)
// const dataRotations = [
//   {
//     name: "name-song",
//     timelines: [
//       { elapsedTime: 3.0, rotate: true },
//       { elapsedTime: 7.0, rotate: false },
//     ],
//   },
// ];

// const dataRotation = dataRotations[0];

export function Scene1() {
  const starsRef = useRef();
  useEffect(() => {
    if (starsRef.current) {
      window.stars = starsRef.current;

      window.stars.isRotating = true;
    }
  }, [starsRef.current]);
  useFrame(({ clock }) => {
    // dataRotation (individual for each song)
    // if (
    //   clock.elapsedTime >= dataRotation.timelines[0].elapsedTime &&
    //   clock.elapsedTime < dataRotation.timelines[0].elapsedTime + 0.1
    // ) {
    //   window.orbitControls.autoRotate = dataRotation.timelines[0].rotate;
    // }
    // if (
    //   clock.elapsedTime >= dataRotation.timelines[1].elapsedTime &&
    //   clock.elapsedTime < dataRotation.timelines[1].elapsedTime + 0.1
    // ) {
    //   window.orbitControls.autoRotate = dataRotation.timelines[1].rotate;
    // }
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

  const xrmode = useAppStore((state) => state.xrmode);

  const showVideoPoints = useScene1Store((state) => state.showVideoPoints);
  const showTextTessellation = useScene1Store(
    (state) => state.showTextTessellation
  );
  const showRollercoaster = useScene1Store((state) => state.showRollercoaster);

  return (
    <>
      <ambientLight />
      {/* <Box /> */}
      {/* <BoxVideo /> */}
      {/* <BoxShader /> */}

      {/* <Ocean /> */}

      {showVideoPoints && <VideoPoints />}

      {showTextTessellation && (
        <TextTessellation text="Sepinaco" position={[0, 0, 0]} />
      )}

      {showRollercoaster && <Rollercoaster />}

      {/* <group>
            <group>
                <VideoPoints />
                <VideoPoints position={[30,0,0]}/>
            </group>
            <group position={[100,100,0]}>
                <VideoPoints />
                <VideoPoints position={[30,0,0]}/>
            </group>
        </group> */}

      {/* <group position={[100,100,0]}>
            <group>
                <VideoPoints />
                <VideoPoints position={[30,0,0]}/>
            </group>
            <group position={[90,0,0]}>
                <VideoPoints />
                <VideoPoints position={[30,0,0]}/>
            </group>
        </group> */}

      {/* <MusicVisualCubeReact /> */}
      {/* <SubtitleMesh /> */}
      {/* <MeshSurfaceSampler /> */}

      {/* {!xrmode && (   */}
      <Stars
        ref={starsRef}
        radius={1000}
        count={1999}
        depth={400}
        factor={55}
        fade /* speed={1} */
        /* saturation={1} */
      />
      {/* )} */}
    </>
  );
}

export const Scene1XR = React.memo(({}) => {
  return (
    <>
      <Scene1 />
      {/* <PerformanceText /> */}
      {/* <CameraInfoText /> */}
      {/* <XRInfoText /> */}
    </>
  );
});
