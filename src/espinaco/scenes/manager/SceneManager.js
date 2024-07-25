import React, { Suspense } from "react";
import { Scene1, Scene1XR } from "../scene1/Scene1";
import { Scene2 } from "../scene2/Scene2";
import { Box } from "@react-three/drei";
import useAppStore from "../../apps/manager/store/AppManagerStore";
import useSceneManagerStore from "./store/SceneManagerStore";

export default function SceneManager() {

  const xrmode = useAppStore((state) => state.xrmode);
  const sceneId = useSceneManagerStore((state) => state.sceneId);


  return (
    <Suspense fallback={<Box material-color="red" material-wireframe="true" />}>
      {(() => {
        switch (sceneId) {
          case 0:
            return xrmode ? <Scene1XR /> : <Scene1 />;
          case 1:
            return <Scene2 />;
          default:
            console.error("No se ha definido la Scene elegida, Scene: " + sceneId);
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
