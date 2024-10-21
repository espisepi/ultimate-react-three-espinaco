// This demo is also playable without installation here:
// https://codesandbox.io/s/basic-demo-forked-ebr0x

import type {
  CylinderArgs,
  CylinderProps,
  PlaneProps,
} from "@react-three/cannon";
import { Debug, Physics, useCylinder, usePlane } from "@react-three/cannon";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

import { useToggledControl } from "./use-toggled-control";
import Vehicle from "./Vehicle";

function Plane(props: PlaneProps) {
  const [ref] = usePlane(
    () => ({ material: "ground", type: "Static", ...props }),
    useRef<Group>(null)
  );
  return (
    <group ref={ref} visible={false}>
      {/* <mesh receiveShadow> */}
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  );
}

function Pillar(props: CylinderProps) {
  const args: CylinderArgs = [0.7, 0.7, 5, 16];
  const [ref] = useCylinder(
    () => ({
      args,
      mass: 10,
      ...props,
    }),
    useRef<Mesh>(null)
  );
  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}

const style = {
  color: "white",
  fontSize: "1.2em",
  left: 50,
  position: "absolute",
  top: 20,
} as const;

const VehicleScene = () => {
  // const ToggledDebug = useToggledControl(Debug, "?");

  return (
    <>
      {/* <Canvas camera={{ fov: 50, position: [0, 5, 15] }} shadows>
        <fog attach="fog" args={['#171720', 10, 50]} />
        <color attach="background" args={['#171720']} />
        <ambientLight intensity={0.1 * Math.PI} />
        <spotLight
          angle={0.5}
          castShadow
          decay={0}
          intensity={Math.PI}
          penumbra={1}
          position={[10, 10, 10]}
        /> */}
<Physics
  broadphase="SAP"
  defaultContactMaterial={{
    contactEquationRelaxation: 2.5, // Mantén una ligera relajación para evitar rebotes duros
    friction: 0.01, // Alta fricción para asegurar que el coche no derrape fácilmente
  }}
  allowSleep
>
  <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: "floor" }} />
  <Vehicle
    position={[0, 1.5, 0]} // Altura estándar para un coche de rally
    rotation={[0, 0, 0]} // Sin rotación inicial para un arranque más estable
    angularVelocity={[0, 0.2, 0]} // Baja velocidad angular para minimizar el riesgo de trompo
    force={3000} // Fuerza del motor moderada para facilitar el control
    maxBrake={150} // Frenos muy potentes para una parada rápida y estable
    radius={0.6} // Ruedas ligeramente más grandes para mayor estabilidad
    steer={0.5} // Dirección reducida para evitar giros bruscos
    width={2.0} // Ancho aumentado para mejorar la estabilidad lateral
    height={-0.05} // Ruedas más cerca del suelo para bajar el centro de gravedad
    back={-1.6} // Posición de las ruedas traseras más retrasada para mayor estabilidad
    front={1.6} // Posición de las ruedas delanteras más adelantada para mejor control
  />
</Physics>

      {/* <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div style={style}>
        <pre>
          * WASD to drive, space to brake
          <br />r to reset
          <br />? to debug
        </pre>
      </div> */}
    </>
  );
};

export const RaycastVehicle = () => {
  return <VehicleScene />;
};