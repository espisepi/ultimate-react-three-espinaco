import { useEffect, useMemo } from "react";
import RollercoasterControlsClass from "./RollercoasterControlsClass";
import { useFrame, useThree } from "@react-three/fiber";
import useVideo from "../../hooks/useVideo";


export default function RollercoasterControls() {
  const { scene, camera } = useThree();
  const video = useVideo();
  const rollercoasterControls = useMemo(()=> video ? new RollercoasterControlsClass({scene,camera,video}) : null,[video]);

  useFrame(()=>{
    if(rollercoasterControls) {
      rollercoasterControls.update();
    }
  })

  return null;
}
