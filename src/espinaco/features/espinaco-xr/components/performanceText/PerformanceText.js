import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PerformanceText() {
  const [fps, setFps] = useState(0);
  const frameTimes = useRef([]);
  const textRef = useRef();

  // Read camera position in XR https://docs.pmnd.rs/xr/advanced/pitfalls#reading-the-camera-position-in-xr
  const camera = useThree(state => state.camera)
//   useFrame(() => camera.getWorldPosition(target))

  useFrame(() => {
    const now = performance.now();
    frameTimes.current.push(now);

    while (frameTimes.current.length > 0 && frameTimes.current[0] <= now - 1000) {
      frameTimes.current.shift();
    }

    setFps(frameTimes.current.length);

    if (textRef.current) {
      textRef.current.position.copy(camera.position).add(new THREE.Vector3(0, 0, -2)); // Ajusta la posición según sea necesario
    }
  });

  return (
    <Text ref={textRef} fontSize={0.1} color="white" position={[0, 0, -2]}>
      FPS: {fps}
    </Text>
  );
}