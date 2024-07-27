// This demo is also playable without installation here:
// https://codesandbox.io/s/basic-demo-forked-ebr0x

import type { PlaneProps } from "@react-three/cannon";
import { Physics, usePlane } from "@react-three/cannon";
import { useRef } from "react";
import type { Group } from "three";

import VehicleVR from "./VehicleVR";

function Plane(props: PlaneProps) {
  const [ref] = usePlane(
    () => ({ material: "ground", type: "Static", ...props }),
    useRef<Group>(null)
  );
  return (
    <group ref={ref} visible={false}>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  );
}


export const VehicleSceneVR = () => {
  return (
    <>
      <Physics
        broadphase="SAP"
        defaultContactMaterial={{
          contactEquationRelaxation: 4,
          friction: 1e-3,
        }}
        allowSleep
      >
        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: "floor" }} />
        <VehicleVR
          position={[0, 2, 0]}
          rotation={[0, 0, 0]}
          angularVelocity={[0, 0.5, 0]}
        />
      </Physics>
    </>
  );
};

export const RaycastVehicleVR = () => {
  return <VehicleSceneVR />;
};
