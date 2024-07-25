import React, { useEffect, useState } from "react";
import GodCameraControls from "../god/GodCameraControls";
import RollercoasterControls from "../rollercoaster/controls/RollercoasterControls";
import { useThree } from "@react-three/fiber";
import OrbitControls from "../orbitControls/OrbitControls";
import GodCameraControlsXR from "../god/GodCameraControlsXR";
import RollercoasterControlsXR from "../rollercoaster/controls/RollercoasterControlsXR";
import useAppStore from "../../apps/manager/store/AppManagerStore";
import useSceneManagerStore from "../../scenes/manager/store/SceneManagerStore";
import useControlsManagerXRStore from "./store/ControlsManagerXRStore";

export default function ControlsManagerXR() {

    const controlsXRId = useControlsManagerXRStore( state => state.controlsXRId );
    const sceneId = useSceneManagerStore( state => state.sceneId );

    const { camera } = useThree();
    const [cameraPosition, setCameraPosition] = useState([0,0,0]); // da igual el valor que ponga porque se modifica en el useEffect
    useEffect(() => {
        switch (sceneId) {
        case 0:
            setCameraPosition((v) => [0, 0, 400]);
            break;
        case 1:
            setCameraPosition((v) => [0, 0, 0.1]);
            break;
        case 2:
            setCameraPosition((v) => [0, 0, 400]);
            break;
        default:
            // console.log("No se ha definido un cameraPosition para la Scene elegida, Scene: " + sceneId);
            setCameraPosition((v) => [0, 0, 0]);
            break;
        }

        if(controlsXRId === 1) {
          camera?.position.set(0, 0, 0);
          camera?.rotation.set(0, 0, 0);
        }
    }, [sceneId, controlsXRId]);
    return (
        <>
            {(() => {
              switch (controlsXRId) {
                case 0:
                  return <GodCameraControlsXR />;
                case 1:
                  return <RollercoasterControlsXR />;
                default:
                  console.warn("No se ha definido el control XR elegido, Control: " + controlsXRId);
                  return null;
              }
            })()}
        </>
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