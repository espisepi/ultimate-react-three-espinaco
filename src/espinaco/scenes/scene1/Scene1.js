import React from "react";
import VideoPoints from "../../prefabs/videoPoints/VideoPoints";
import TextTessellation from "../../prefabs/text-tesellation/TextTessellation";
import { Rollercoaster } from "../../features/rollercoaster/Rollercoaster";
import useScene1Store from "./Scene1Store";
import Stars from "../../prefabs/stars/Stars";
import { Scene1UI } from "./Scene1UI";
import GBA from "../../features/gba-js-org/GBA";


export const Scene1 = React.memo(({}) => {
  const showVideoPoints = useScene1Store((state) => state.showVideoPoints);
  const showTextTessellation = useScene1Store(
    (state) => state.showTextTessellation
  );
  const showRollercoaster = useScene1Store((state) => state.showRollercoaster);
  const showGBA = useScene1Store((state) => state.showGBA);


  return (
    <>
      <ambientLight />

      <Stars />

      {showVideoPoints && <VideoPoints />}

      {showTextTessellation && (
        <TextTessellation text="Sepinaco" position={[0, 0, 0]} />
      )}

      {showRollercoaster && <Rollercoaster />}

      {showGBA && <GBA />}

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
