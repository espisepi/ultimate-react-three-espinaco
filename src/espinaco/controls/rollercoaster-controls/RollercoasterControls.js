import { useEffect, useMemo, useRef, useState } from "react";
import RollercoasterControlsClass from "./RollercoasterControlsClass";
import { useFrame, useThree } from "@react-three/fiber";
import useVideo from "../../hooks/useVideo";


export default function RollercoasterControls() {
  const { scene, camera } = useThree();
  const video = useVideo();

  // TODO: Usar en useEffect y poner en el return rollercoasterControls.dispose()
  // const rollercoasterControls = useMemo(()=> video ? new RollercoasterControlsClass({scene,camera,video}) : null,[video]);
  const [rollercoasterControls, setRollercoasterControls] = useState();
  const rollercoasterControlsRef = useRef();

  useEffect(() => {
    if (video) {
      const controls = new RollercoasterControlsClass({ scene, camera, video });
      setRollercoasterControls(controls);
      rollercoasterControlsRef.current = controls;
    }

    return () => {
      if (rollercoasterControlsRef.current) {
        // TODO IMPORTANTE: DESCOMENTAR PARA MEJORAR RENDIMIENTO Y QUITAR EL ROLLERCOASTER
        // AL QUITAR EL COMPONENTE
        // rollercoasterControlsRef.current.dispose();
      }
    };
  }, [video]);

  useFrame(()=>{
    if(rollercoasterControls) {
      rollercoasterControls.update();
    }
  })

  return null;
}
