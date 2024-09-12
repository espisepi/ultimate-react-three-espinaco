import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { XROrigin } from "@react-three/xr";


export function CameraFollowObjectVR({name="", interval = 1, position=[0,0,0], rotation=[0,0,0]}) {

    // 0 - obtener la referencia a la camara VR
    const ref = useRef(null);

    // 1 - obtener de la scene el objeto
    const { scene } = useThree();
    const [train,setTrain] = useState<THREE.Object3D>(); /* train: THREE.Object3D */
    const trainRef = useRef<THREE.Object3D>();  /* train: THREE.Object3D */
    useEffect(()=>{
      const id_interval = setInterval(()=>{
            console.log(`Buscando el objeto ${name} para seguirlo con la camara`);
            const trainFinded = scene.getObjectByName(name);
            if(trainFinded){
              clearInterval(id_interval);
              trainRef.current = trainFinded;
              setTrain(v => trainFinded);
            }
      },interval);
    },[name]);

    // 2 - Poner/Quitar la camara en el rollercoaster
    useEffect(()=>{
      if(trainRef.current && ref.current) {
        // 2.1 - Poner la camara en el rollercoaster
      trainRef.current.add(ref.current);

        // 2.2 - Recolocar la camara
        (ref.current as THREE.Object3D).position.set(position[0],position[1], position[2]);
        (ref.current as THREE.Object3D).rotation.set(rotation[0],rotation[1], rotation[2]);

        // console.log("ENCONTRADO! ", {trainRef})
      }
      return () => {
        if (trainRef.current && ref.current) {
          // Quitar la camara del rollercoaster
        trainRef.current.remove(ref.current);
        }
      };
    },[trainRef.current, train]);


  return <XROrigin ref={ref} />;
}





// train.add(camera); // para poner la camara en el rollercoaster
// train.remove(camera); // para quitar la camara del rollercoaster