import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";


export default function RollercoasterControls({name="train", interval = 1000}) {

    // 1 - obtener de la scene el train
    const { scene, camera } = useThree();
    const [train,setTrain] = useState(); /* train: THREE.Object3D */
    const trainRef = useRef();  /* train: THREE.Object3D */
    useEffect(()=>{
      const id_interval = setInterval(()=>{
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
      if(trainRef.current) {
        // Poner la camara en el rollercoaster
        trainRef.current.add(camera);
      }
      return () => {
        if (trainRef.current) {
          // Quitar la camara del rollercoaster
          trainRef.current.remove(camera);
        }
      };
    },[trainRef.current, train]);
  return null;
}





// train.add(camera); // para poner la camara en el rollercoaster
// train.remove(camera); // para quitar la camara del rollercoaster