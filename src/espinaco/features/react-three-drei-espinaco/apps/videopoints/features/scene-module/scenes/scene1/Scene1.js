import React from "react";
import VideoPoints from "../../../../../../prefabs/videoPoints/VideoPoints";
import TextTessellation from "../../../../../../prefabs/text-tesellation/TextTessellation";
import { Rollercoaster } from "../../../../../../features/rollercoaster/Rollercoaster";
import useScene1Store from "./Scene1Store";
import Stars from "../../../../../../prefabs/stars/Stars";
import { Scene1UI } from "./Scene1UI";
import GBA from "../../../../../../../gba-js-org/GBA";
import { HorsesPrefab } from "../../../../../../prefabs/horses/HorsesPrefab";
import { HorsesManager } from "../../../../../../prefabs/horses/HorsesManager";
import { SkyWaterPrefab } from "../../../../../../prefabs/sky-water/SkyWaterPrefab";

import { Sky } from "@react-three/drei";
import PhyTower from "../../../../../../prefabs/phy-prefabs/phy-tower/PhyTower";
import PhyVehicleTerrain from "../../../../../../prefabs/phy-prefabs/phy-vehicle-terrain/PhyVehicleTerrain";
import { Color } from "three";

export const Scene1 = React.memo(({}) => {
  const showVideoPoints = useScene1Store((state) => state.showVideoPoints);
  const showTextTessellation = useScene1Store(
    (state) => state.showTextTessellation
  );
  const showRollercoaster = useScene1Store((state) => state.showRollercoaster);
  const showGBA = useScene1Store((state) => state.showGBA);


  return (
    <>
      <ambientLight intensity={1} />

      <Stars />

      {showVideoPoints && <VideoPoints />}

      {/* <PhyTower /> */}

      {/* <PhyVehicleTerrain /> */}



      {/* {showTextTessellation && (
        <TextTessellation text="Sepinaco" position={[0, 0, 0]} />
      )} */}

      {/* {showRollercoaster && <Rollercoaster />} */}

      {/* <HorsesPrefab /> */}
      {/* <HorsesManager /> */}

      {/* <SkyWaterPrefab /> */}

     {/* <GBA visible={showGBA} displayTextureGbaGame={true} /> */}

      {/* <Scene1UI /> */}

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

      {/* <Box /> */}
      {/* <BoxVideo /> */}
      {/* <BoxShader /> */}

      {/* <Ocean /> */}
      {/* <MusicVisualCubeReact /> */}
      {/* <SubtitleMesh /> */}
      {/* <MeshSurfaceSampler /> */}
    </>
  );
});

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
