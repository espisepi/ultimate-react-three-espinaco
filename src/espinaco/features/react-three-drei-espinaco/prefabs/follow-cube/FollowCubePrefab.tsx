import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

export function FollowCubePrefab({ ...props }) {
  return <FollowCube {...props} />;
}

function FollowCube({ ...props }) {
  const cubeRef = useRef<Mesh>();

  useFrame(({ camera }) => {
    if (cubeRef.current) {
      // Si quieres que el cubo esté en frente de la cámara a cierta distancia
      const offsetDistance = 30;
      const direction = camera.getWorldDirection(new Vector3());
      const position = camera.position
        .clone()
        .add(direction.multiplyScalar(offsetDistance));

      // Actualizar la posición del cubo para que coincida con el offset
      cubeRef.current.position.copy(position);
    }
  });

  return (
    <>
      <mesh ref={cubeRef} {...props}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
