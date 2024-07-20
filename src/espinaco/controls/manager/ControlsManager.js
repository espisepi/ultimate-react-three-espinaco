import React, { useEffect, useState } from "react";
import GodCameraControls from "../god/GodCameraControls";
import Rollercoaster from "../../controls/rollercoaster/Rollercoaster";
import RollercoasterControls from "../rollercoaster/controls/RollercoasterControls";
import { useThree } from "@react-three/fiber";
import GodCameraControlsXR from "../god/GodCameraControlsXR";
import useControlsStore from "../store/ControlsStore";

export default function ControlsManager({
  id_scene = 0,
  xrmode = false
}) {

    const controlsId = useControlsStore( state => state.controlsId );

    const { camera } = useThree();
    const [cameraPosition, setCameraPosition] = useState([0,0,0]); // da igual el valor que ponga porque se modifica en el useEffect
    useEffect(() => {
        switch (id_scene) {
        case 0:
            setCameraPosition((v) => [0, 0, 400]);
            break;
        case 1:
            setCameraPosition((v) => [0, 0, 0.1]);
            break;
        default:
            console.log("No se ha definido un cameraPosition para la Scene elegida, Scene: " + id_scene);
            setCameraPosition((v) => [0, 0, 0]);
            break;
        }

        if(controlsId === 1) {
          camera?.position.set(0, 0, 0);
          camera?.rotation.set(0, 0, 0);
        }
    }, [id_scene, controlsId]);
    return (
        <>
            {(() => {
              switch (controlsId) {
                case 0:
                  return xrmode ? <GodCameraControlsXR position={cameraPosition} /> : <GodCameraControls position={cameraPosition} /> ;
                case 1:
                  return <RollercoasterControls />;
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