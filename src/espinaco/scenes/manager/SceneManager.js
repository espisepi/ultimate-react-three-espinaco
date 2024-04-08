import React, { Suspense, useEffect, useMemo, useState } from "react";
import Scene1Canvas, { Scene1 } from "../scene1/Scene1";
import Scene2Canvas, { Scene2 } from "../scene2/Scene2";
import Scene3Canvas, { Scene3 } from "../scene3/Scene3";
import { Canvas } from "@react-three/fiber";
import { Box, PerspectiveCamera, Stats } from "@react-three/drei";
import GodCameraControls from "../../controls/GodCameraControls";

export default function SceneManager({
  id = 0,
  style = { position: "absolute", top: "0", width: "100%", height: "100vh" },
}) {
  const [cameraPosition, setCameraPosition] = useState();
  useEffect(() => {
    switch (id) {
      case 0:
        setCameraPosition((v) => [0, 0, 400]);
        break;
      case 1:
        setCameraPosition((v) => [0, 0, 0.1]);
        break;
      case 2:
        setCameraPosition((v) => [0, 0, 0.1]);
        break;
      default:
        console.log("No se ha definido un cameraPosition para la Scene elegida, Scene: " + id);
        setCameraPosition((v) => [0, 0, 0]);
        break;
    }
  }, [id]);
  return (
    <Canvas
      style={{ ...style, backgroundColor: "black" }}
      camera={{
        // position: cameraPosition,
        far: 9999999,
      }}
    >
      <GodCameraControls position={cameraPosition} />
      {/* <Stats /> */}
      <Suspense
        fallback={<Box material-color="red" material-wireframe="true" />}
      >
        {(() => {
          switch (id) {
            case 0:
              return <Scene1 style={style} />;
            case 1:
              return <Scene2 style={style} />;
            case 2:
              return <Scene3 style={style} />;
            default:
              alert("No se ha definido la Scene elegida, Scene: " + id);
              return null;
          }
        })()}
      </Suspense>
    </Canvas>
  );
}
