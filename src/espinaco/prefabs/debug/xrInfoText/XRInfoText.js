import React, { useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useXR } from "@react-three/xr";

export default function XRInfoText() {
  const textRef = useRef();

  const camera = useThree((state) => state.camera);

  const xrState = useXR();

  useFrame(() => {
    // if (textRef.current) {
    //   textRef.current.position
    //     .copy(camera.position)
    //     .add(new THREE.Vector3(0, 0.2, -2)); // Ajusta la posición según sea necesario
    // }
  });
  if (xrState) {
    return (
      <Text ref={textRef} fontSize={0.1} color="white" position={[0, 0.2, -2]}>
        XR Info:
        {JSON.stringify({ ...xrState })}
      </Text>
    );
  }
  else {
    return (
      <Text ref={textRef} fontSize={0.1} color="white" position={[0, 0.2, -2]}>
        XR Info:
        Cargando Informacion...
      </Text>
    );
  }
}
