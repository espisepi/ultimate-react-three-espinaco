import React, { useEffect } from "react";
import { World } from "./world/World";

type GTAWorldControlsProps = {};

export const GTAWorldControls: React.FC<GTAWorldControlsProps> = React.memo(() => {
  console.log("HELLO GTAWORLD");
  useEffect(() => {
    console.log("useeffect");
    const gtaWorld = new World();
    return () => {
      console.log("useefect destruido");
    }
  }, []);
  return null;
});
