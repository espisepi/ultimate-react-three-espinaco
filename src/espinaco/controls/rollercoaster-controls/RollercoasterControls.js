import { useEffect, useMemo } from "react";
import RollercoasterControlsClass from "./RollercoasterControlsClass";
import { useFrame, useThree } from "@react-three/fiber";


export default function RollercoasterControls() {
  const { scene, camera } = useThree();
  const rollercoasterControls = useMemo(()=> new RollercoasterControlsClass({scene,camera}),[]);
  console.log("rollercoasterControls class: ",rollercoasterControls);

  useFrame(()=>{
    if(rollercoasterControls) {
      rollercoasterControls.update();
    }
  })

  return null;
}
