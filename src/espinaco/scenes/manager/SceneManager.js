import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Scene1, Scene1XR } from "../scene1/Scene1";
import { Scene2 } from "../scene2/Scene2";
import { Box } from "@react-three/drei";
import useAppStore from "../../apps/store/AppStore";

export default function SceneManager({ id = 0 }) {

  const xrmode = useAppStore((state) => state.xrmode);

  return (
    <Suspense fallback={<Box material-color="red" material-wireframe="true" />}>
      {(() => {
        switch (id) {
          case 0:
            return xrmode ? <Scene1XR /> : <Scene1 />;
          case 1:
            return <Scene2 />;
          default:
            console.error("No se ha definido la Scene elegida, Scene: " + id);
            return null;
        }
      })()}
    </Suspense>
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
