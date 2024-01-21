import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { Cube, Cubes } from "./components/Cube";

export default function Minecraft() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      {/* <Canvas shadows camera={{ fov: 45 }}> */}
      {/* <Sky sunPosition={[100, 20, 100]} /> */}
      <ambientLight intensity={0.3} />
      {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} /> */}
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
        <Cube position={[0, 0.5, -10]} />
        <Cubes />
      </Physics>
      <PointerLockControls />
      {/* </Canvas> */}
    </KeyboardControls>
  );
}
