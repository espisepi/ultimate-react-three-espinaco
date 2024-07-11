import React, { useEffect, useState } from "react";
import GodCameraControls from "../../controls/GodCameraControls";
import Rollercoaster from "../../controls/rollercoaster/Rollercoaster";

export default function ControlsManager({
  id_control = 0,
  id_scene = 0
}) {
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
    }, [id_scene]);
return (
    <>
        {(() => {
          switch (id_control) {
            case 0:
              return <GodCameraControls position={cameraPosition} /> ;
            case 1:
              return <Rollercoaster />;
            default:
              console.warn("No se ha definido el control elegido, Control: " + id_control);
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