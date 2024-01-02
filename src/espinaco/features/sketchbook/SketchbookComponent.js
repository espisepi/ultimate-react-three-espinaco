import React, { useEffect } from "react";
import * as Sketchbook from "./sketchbook.min.js"; // Asegúrate de que la ruta sea correcta
import { useThree } from "@react-three/fiber";

export default function SketchbookComponent() {
  const { scene } = useThree();

  useEffect(() => {
    console.log(Sketchbook);
    const world = new Sketchbook.World("build/assets/world.glb");
    // canvas sketchbook custom style
    const canvasSketchbookElement = world.renderer.domElement;
    console.log({
      canvasSketchbookElement,
      scene,
      graphicsWorld: world.graphicsWorld,
    });
    canvasSketchbookElement.style.position = "absolute";
    canvasSketchbookElement.style.top = 0;
    canvasSketchbookElement.style.zIndex = -1;
    // add scene sketchbook to scene react-three-fiber
    // scene.add(world.graphicsWorld);

    // Puedes realizar otras operaciones con 'world' aquí si es necesario
    return () => {
      // Realiza alguna limpieza si es necesario cuando el componente se desmonte
      // Por ejemplo, world.dispose();
    };
  }, []);

  return null;
}
