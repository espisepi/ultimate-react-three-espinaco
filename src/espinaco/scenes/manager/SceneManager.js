import React, { Suspense, useEffect, useMemo, useState } from "react";
import Scene1Canvas, { Scene1 } from "../scene1/Scene1";
import Scene2Canvas, { Scene2 } from "../scene2/Scene2";
import { Canvas } from "@react-three/fiber";
import { Box, PerspectiveCamera, Stats } from "@react-three/drei";
import GodCameraControls from "../../controls/GodCameraControls";
import RollercoasterControls from "../../controls/rollercoaster-controls/RollercoasterControls";
import ControlsManager from "../../controls/manager/ControlsManager";

export default function SceneManager({
  id = 0,
  style = { position: "absolute", top: "0", width: "100%", height: "100vh" },
}) {
  return (
    <Canvas
      style={{ ...style, backgroundColor: "black" }}
      camera={{
        // position: cameraPosition,
        far: 9999999,
      }}
    >
      {/* <GodCameraControls position={cameraPosition} /> */}
      {/* <RollercoasterControls /> */}
      {/* <Stats /> */}

      {/* TODO: El <ControlsManager> va fuera de Scenemanager.js, y el <Canvas> tambien */}
      <ControlsManager id_control={0} id_scene={id} />

      
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



// TODO: Fix para el cambio de tamaño de imagen
// const video = useVideo();
// useEffect(() => {
//   switch (id) {
//     case 0:
//       if(video && video.videoWidth !== 0 && video.videoHeight !== 0) {
//         setCameraPosition((v) => [0, 0, ( video.videoWidth / (640/400) )]);
//       } else {
//         setCameraPosition((v) => [0, 0, 400]);
//       }