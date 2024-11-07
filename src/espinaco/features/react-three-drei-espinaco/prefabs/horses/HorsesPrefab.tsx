import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { HorseScene } from "./HorseScene";
import { useVideoTexture } from "../../../videoplayer/hook/useVideoTexture";

export function HorsesPrefab() {
  const model: any = useGLTF("models/Horse.glb");
  const { scene } = useThree();
  const videoTexture = useVideoTexture();

  const [horseScene, setHorseScene] = useState<HorseScene | null>(null);

  console.log("Montando el componente HorsesPrefab!");

  useEffect(() => {
    let localHorseScene: HorseScene | null = null;

    if (scene && model && videoTexture) {
      localHorseScene = new HorseScene(scene, model, videoTexture);
      setHorseScene(localHorseScene);
    }

    return () => {
      console.log("DESMONTANDO EL COMPONENTE HorsesPrefab:", localHorseScene);
      if (localHorseScene) {
        localHorseScene.dispose();
      }
      setHorseScene(null);
    };
  }, [scene, model, videoTexture]);

  useFrame(({ clock }) => {
    if (horseScene) {
      horseScene.update(clock.getElapsedTime());
      // horseScene.updateWithMovement(clock.getElapsedTime());
    }
  });

  return null;
}
