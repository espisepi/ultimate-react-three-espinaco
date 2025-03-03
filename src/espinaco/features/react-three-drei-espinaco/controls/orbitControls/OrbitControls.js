import React, { useEffect, useRef } from "react";
import { OrbitControls as OrbitControlsThree } from "@react-three/drei";

import { useThree } from "@react-three/fiber";

// position: [x,y,z] Array<number>
// tagetPosition: same as position churritagorda
export default function OrbitControls({ position, targetPosition }) {
  const { camera, set } = useThree();
  const orbitControls = useRef();

  useEffect(() => {
    // Cambiar la posicion de la camara
    if (position) {
      camera?.position.set(position[0], position[1], position[2]);
      if (targetPosition) {
        orbitControls.current?.target.set(
          targetPosition[0],
          targetPosition[1],
          targetPosition[2]
        );
      } else {
        orbitControls.current?.target.set(0, 0, 0);
      }
    }
  }, [position]);

  useEffect(() => {
    // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo (por ejemplo para cambiar el orbitControls.autoRotate)
    window.orbitControls = orbitControls?.current;
  }, [orbitControls]);

  useEffect(() => {
    // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo (por ejemplo para cambiar el orbitControls.autoRotate)
    window.camera = camera;
  }, [camera]);

  useEffect(() => {
    // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo usando el hook de r3f useThree
     set({ orbitControls: orbitControls.current });
  }, [orbitControls, set]);

  return <OrbitControlsThree ref={orbitControls} />;
}
