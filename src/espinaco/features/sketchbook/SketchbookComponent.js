import React, { useEffect } from "react";
import * as Sketchbook from "./sketchbook.min.js"; // Asegúrate de que la ruta sea correcta

export default function SketchbookComponent() {
  useEffect(() => {
    console.log(Sketchbook);
    const world = new Sketchbook.World("build/assets/world.glb");
    // Puedes realizar otras operaciones con 'world' aquí si es necesario
    return () => {
      // Realiza alguna limpieza si es necesario cuando el componente se desmonte
      // Por ejemplo, world.dispose();
    };
  }, []);

  return null;
}
