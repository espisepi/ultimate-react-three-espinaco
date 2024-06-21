import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react';
import { Box } from '@react-three/drei';
import RollercoasterControls from '../../controls/rollercoaster-controls/RollercoasterControls';
import { Scene1 } from '../scene1/Scene1';
import { Scene2 } from '../scene2/Scene2';


export default function SceneManagerXR({
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
      default:
        console.log("No se ha definido un cameraPosition para la Scene elegida, Scene: " + id);
        setCameraPosition((v) => [0, 0, 0]);
        break;
    }
  }, [id]);
  return (
     <>
      <VRButton style={{
            top: 0,
            height: "5rem",
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 24px",
            border: "1px solid white",
            borderRadius: "4px",
            background: "rgba(0, 0, 0, 0.1)",
            color: "white",
            font: "0.8125rem sans-serif",
            outline: "none",
            zIndex: 99999,
            cursor: "pointer",
      }} />
      <Canvas style={{ ...style, backgroundColor: "black" }}>
        <XR>
          <Controllers />
          <Hands />
          

        {/* <GodCameraControls position={cameraPosition} /> */}
        <RollercoasterControls />
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
        </XR>
      </Canvas>
    </>
  );
}