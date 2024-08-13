import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Scene } from 'three';

export const GoogleMaps3DScene = () => {
  const { scene } = useThree();
  const externalSceneRef = useRef(new Scene());

  useEffect(() => {
    const handleSceneUpdate = (event) => {
      console.log(event.detail.estado)
      const newScene = event.detail.estado.scene; // Asumiendo que la escena se pasa en event.detail
      if(newScene) {
        // Eliminar los hijos actuales de la escena
        // while (externalSceneRef.current.children.length) {
        //   externalSceneRef.current.remove(externalSceneRef.current.children[0]);
        // }

        // // Añadir los objetos de la nueva escena
        // console.log(newScene)
        // newScene.children.forEach((child) => {
        //   externalSceneRef.current.add(child.clone());
        // });

        // // Añadir la escena externa a la escena actual
        // scene.add(externalSceneRef.current);
        scene.remove(newScene);
        scene.add(newScene);
      }

    };

    // Escuchar el evento personalizado
    window.addEventListener('estadoCambiado', handleSceneUpdate);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener('estadoCambiado', handleSceneUpdate);
    };
  }, [scene]);

  return null;
};
