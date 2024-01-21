import React, { Suspense, useEffect, useMemo, useState } from "react";
import Scene1Canvas, { Scene1 } from "../scene1/Scene1";
import Scene2Canvas, { Scene2 } from "../scene2/Scene2";
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
        setCameraPosition((v) => [0, 0, 30]);
        break;
      default:
        alert("No se ha definido la Scene elegida, PUTA Scene: " + id);
        setCameraPosition((v) => [0, 0, 0]);
        break;
    }
  }, [id]);
  console.log(cameraPosition);
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
            default:
              alert("No se ha definido la Scene elegida, Scene: " + id);
              return null;
          }
        })()}
      </Suspense>
    </Canvas>
  );
}
