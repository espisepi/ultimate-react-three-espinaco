import React, { useEffect, useState } from "react";
import GodCameraControls from "../god/GodCameraControls";
import { RollercoasterControls } from "../../../rollercoaster/controls/RollercoasterControls";
import { useThree } from "@react-three/fiber";
import OrbitControls from "../orbitControls/OrbitControls";
import { useSceneStore } from "../../../../scene-module/store/SceneStore";
import useControlsManagerStore from './store/ControlsManagerStore';
import { CarVehicleCannon } from '../../../car-vehicle-cannon/CarVehicleCannon';

export default function ControlsManager() {

    const controlsId = useControlsManagerStore( state => state.controlsId );
    const sceneId = useSceneStore( state => state.sceneId );

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

        if(controlsId === 1) {
          camera?.position.set(0, 0, 0);
          camera?.rotation.set(0, 0, 0);
        }
    }, [sceneId, controlsId]);


    return (
        <>
            {(() => {
              switch (controlsId) {
                case 0:
                  return <OrbitControls position={cameraPosition} />;
                case 1:
                  return <RollercoasterControls />;
                case 2:
                  return <GodCameraControls position={cameraPosition} />;
                case 3:
                  return <CarVehicleCannon />
                default:
                  console.warn("No se ha definido el control elegido, Control: " + controlsId);
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