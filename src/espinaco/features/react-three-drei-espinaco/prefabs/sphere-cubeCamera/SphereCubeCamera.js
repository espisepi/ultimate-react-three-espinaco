import { CubeCamera, Float } from "@react-three/drei";

export default function SphereCubeCamera() {
  return (
    <>
      {/** The sphere reflects the screen with a cube-cam */}
      <Float rotationIntensity={3} floatIntensity={3} speed={1}>
        <CubeCamera
          position={[-3, -1, -5]}
          resolution={1080}
          frames={Infinity}
          far={9999}
        >
          {(texture) => (
            <mesh>
              <sphereGeometry args={[2, 32, 32]} />
              <meshStandardMaterial
                metalness={1}
                roughness={0.1}
                envMap={texture}
              />
            </mesh>
          )}
        </CubeCamera>
      </Float>
    </>
  );
}
