import { useEffect, useMemo, useRef, useState } from "react";
import RollercoasterClass from "./RollercoasterClass";
import { useFrame, useThree } from "@react-three/fiber";
import { useVideoTexture } from "../../../videoplayer/hook/useVideoTexture";


export function Rollercoaster() {

  const { scene, camera } = useThree();

  const videoTexture = useVideoTexture();

  const [rollercoaster, setRollercoaster] = useState();
  const rollercoasterRef = useRef();

  useEffect(() => {
    if (videoTexture) {
      const controls = new RollercoasterClass({ scene, camera, videoTexture });
      setRollercoaster(controls);
      rollercoasterRef.current = controls;
    }

    return () => {
      if (rollercoasterRef.current) {
        rollercoasterRef.current.dispose();
      }
    };
  }, [videoTexture]);

  useFrame(()=>{
    if(rollercoaster) {
      rollercoaster.update();
    }
  })

  return null;
}
