import React, { useEffect } from "react";

type GTAWorldControlsProps = {};

export const GTAWorldControls: React.FC<GTAWorldControlsProps> = React.memo(() => {
  console.log("HELLO GTAWORLD");
  useEffect(() => {
    console.log("useeffect");
    return () => {
      console.log("useefect destruido");
    }
  }, []);
  return null;
});
