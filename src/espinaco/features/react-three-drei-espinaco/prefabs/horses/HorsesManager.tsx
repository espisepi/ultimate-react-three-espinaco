import { useSignalEffect } from "@preact/signals-react";
import { HorsesPrefab } from "./HorsesPrefab";
import { showSceneHorses } from "./HorsesState";
import { HorsesUI } from "./HorsesUI";
import { useState } from "react";

export function HorsesManager() {
  const [showSceneHorsesState, setShowSceneHorsesState] = useState<boolean>(
    showSceneHorses.value,
  );

  useSignalEffect(() => {
    console.log("La signal showSceneHorses ha cambiado:", showSceneHorses.value);
    // Aquí puedes ejecutar la lógica que necesitas cuando cambia la señal
    setShowSceneHorsesState(showSceneHorses.value);
  });

  return (
    <>
      <HorsesUI />
      {showSceneHorsesState && <HorsesPrefab />}
    </>
  );
}
