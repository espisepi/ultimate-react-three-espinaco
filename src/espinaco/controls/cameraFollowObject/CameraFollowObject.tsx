import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";


export function CameraFollowObject({name="", interval = 1, position=[0,0,0], rotation=[0,0,0]}) {

    // 1 - obtener de la scene el objeto
    const { scene, camera } = useThree();
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
      if(trainRef.current) {
        // 2.1 - Poner la camara en el rollercoaster
        trainRef.current.add(camera);

        // 2.2 - Recolocar la camara
        camera.position.set(position[0],position[1], position[2]);
        camera.rotation.set(rotation[0],rotation[1], rotation[2]);

        // console.log("ENCONTRADO! ", {trainRef})
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