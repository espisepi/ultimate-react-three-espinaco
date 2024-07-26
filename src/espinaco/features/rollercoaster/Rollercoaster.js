import { useEffect, useMemo, useRef, useState } from "react";
import RollercoasterClass from "./RollercoasterClass";
import { useFrame, useThree } from "@react-three/fiber";
import useVideo from "../videoplayer/hook/useVideo";


export function Rollercoaster() {
  const { scene, camera } = useThree();
  const video = useVideo();

  // Usar en useEffect y poner en el return rollercoaster.dispose()
  // const rollercoaster = useMemo(()=> video ? new rollercoasterClass({scene,camera,video}) : null,[video]);
  const [rollercoaster, setRollercoaster] = useState();
  const rollercoasterRef = useRef();

  useEffect(() => {
    if (video) {
      const controls = new RollercoasterClass({ scene, camera, video });
      setRollercoaster(controls);
      rollercoasterRef.current = controls;
    }

    return () => {
      if (rollercoasterRef.current) {
        rollercoasterRef.current.dispose();
      }
    };
  }, [video]);

  useFrame(()=>{
    if(rollercoaster) {
      rollercoaster.update();
    }
  })

  return null;
}
