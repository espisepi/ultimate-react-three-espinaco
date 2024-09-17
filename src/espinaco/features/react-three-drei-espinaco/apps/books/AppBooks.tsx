import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { ClickToStart } from "../../../../components/clickToStart/ClickToStart";

export function AppBooks(): JSX.Element {
  return (
    <>
      <ClickToStart password="">
        <div id="app-espinaco" style={{ position: "relative", cursor: "cell" }}>
          <UI />
          <Loader />
          <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
            <group position-y={0}>
              <Suspense fallback={null}>
                <Experience />
              </Suspense>
            </group>
          </Canvas>
        </div>
      </ClickToStart>
    </>
  );
}
