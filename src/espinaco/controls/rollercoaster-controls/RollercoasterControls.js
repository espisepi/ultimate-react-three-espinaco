import { useEffect } from "react";
import RollercoasterControlsClass from "./RollercoasterControlsClass";
import { useThree } from "@react-three/fiber";


export default function RollercoasterControls() {
  const { scene, camera } = useThree();
  useEffect(() => {
    const rollercoasterControls = new RollercoasterControlsClass({scene,camera});
    console.log("rollercoasterControls class: ",rollercoasterControls);
  }, []);

  return null;
}
