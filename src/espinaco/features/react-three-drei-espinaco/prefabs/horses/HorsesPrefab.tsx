import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { HorseScene } from "./HorseScene";
import { useVideoTexture } from "../../../videoplayer/hook/useVideoTexture";

export function HorsesPrefab() {
  const model: any = useGLTF("models/Horse.glb");
  const { scene } = useThree();
  const videoTexture = useVideoTexture();

  const [horseScene, setHorseScene] = useState<HorseScene>();

  useEffect(() => {
    if (scene && model && videoTexture) {
      // Add HorseScene
      const horseScene = new HorseScene(scene, model, videoTexture);
      setHorseScene((v) => horseScene);
    }

    return () => {
      if (horseScene) {
        horseScene.dispose();
        setHorseScene((v) => undefined);
      }
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
