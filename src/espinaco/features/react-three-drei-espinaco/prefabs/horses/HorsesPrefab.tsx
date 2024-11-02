import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { HorseScene } from "./HorseScene";

export function HorsesPrefab() {
  const model: any = useGLTF("models/Horse.glb");
  const { scene } = useThree();

  const [horseScene, setHorseScene] = useState<HorseScene>();

  useEffect(() => {
    if (scene && model) {
      // Add HorseScene
      const horseScene = new HorseScene(scene, model);
      setHorseScene((v) => horseScene);
    }

    return () => {
      if (horseScene) {
        horseScene.dispose();
        setHorseScene((v) => undefined);
      }
    };
  }, [scene, model]);

  useFrame(({ clock }) => {
    if (horseScene) {
      horseScene.update(clock.getElapsedTime());
    }
  });

  return null;
}
