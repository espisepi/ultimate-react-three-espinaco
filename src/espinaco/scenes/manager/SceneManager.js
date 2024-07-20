import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Scene1 } from "../scene1/Scene1";
import { Scene2 } from "../scene2/Scene2";
import { Box } from "@react-three/drei";
export default function SceneManager({
  id = 0,
}) {
  return (
    <Suspense
      fallback={<Box material-color="red" material-wireframe="true" />}
    >
      {(() => {
        switch (id) {
          case 0:
            return <Scene1 />;
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