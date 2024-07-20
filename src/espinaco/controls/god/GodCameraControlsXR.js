import React, { useCallback, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { useFrame, useThree } from "@react-three/fiber";
import useKeyPress from "../../hooks/useKeyPress";
import { useController } from "@react-three/xr";

const vec = new THREE.Vector3();

const SPEED_MIN_VALUE = 100;
const SPEED_MAX_VALUE = 500;

// position: [x,y,z] Array<number>
// tagetPosition: same as position churritagorda
export default function GodCameraControlsXR({ position }) {
  const { camera } = useThree();

  useEffect(() => {
    // Cambiar la posicion de la camara
    if (position) {
      camera?.position.set(position[0], position[1], position[2]);
    }
  }, [position]);

  useEffect(() => {
    // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo (por ejemplo para cambiar el orbitControls.autoRotate)
    window.camera = camera;
  }, [camera]);

  const SPEED_MAX_VALUE = 500;
  const SPEED_MIN_VALUE = 100;

  const speedKeyPress = useKeyPress("ShiftLeft");

  const moveForwardKeyPress = useKeyPress("w");
  const moveBackKeyPress = useKeyPress("s");

  const moveLeftKeyPress = useKeyPress("a");
  const moveRightKeyPress = useKeyPress("d");

  const moveHeight = useKeyPress("e");
  const moveDown = useKeyPress("q");

  const rotateLeftKeyPress = useKeyPress("l");
  const rotateUpKeyPress = useKeyPress("k");
  const rotateDownKeyPress = useKeyPress("i");
  const rotateRightKeyPress = useKeyPress("j");

  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  const moveForward = useCallback(
    (distance) => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      camera.position.addScaledVector(direction, distance);
    },
    [camera]
  );

  const moveRight = useCallback(
    (distance) => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      direction.cross(camera.up);
      camera.position.addScaledVector(direction, distance);
    },
    [camera]
  );

  const moveY = useCallback(
    (distance) => {
      camera.position.y += distance;
    },
    [camera]
  );

  useFrame((_, delta) => {
    const speed = speedKeyPress ? SPEED_MAX_VALUE : SPEED_MIN_VALUE;
    const rotationSpeed = delta * 0.5; // Velocidad de rotación, ajusta según tu necesidad

    if (moveForwardKeyPress) {
      moveForward(delta * speed);
    }
    if (moveBackKeyPress) {
      moveForward(-delta * speed);
    }
    if (moveRightKeyPress) {
      moveRight(delta * speed);
    }
    if (moveLeftKeyPress) {
      moveRight(-delta * speed);
    }
    if (moveHeight) {
      moveY(delta * speed);
    }
    if (moveDown) {
      moveY(-delta * speed);
    }

    if (rotateLeftKeyPress) {
      setYaw((prev) => prev - rotationSpeed); // Rotar hacia la izquierda (eje Y)
    }
    if (rotateRightKeyPress) {
      setYaw((prev) => prev + rotationSpeed); // Rotar hacia la derecha (eje Y)
    }
    if (rotateUpKeyPress) {
      setPitch((prev) => Math.max(-Math.PI / 2, prev - rotationSpeed)); // Rotar hacia arriba (eje X)
    }
    if (rotateDownKeyPress) {
      setPitch((prev) => Math.min(Math.PI / 2, prev + rotationSpeed)); // Rotar hacia abajo (eje X)
    }

    camera.rotation.set(pitch, yaw, 0, "YXZ");

    // camera.updateMatrixWorld();
  });

  // Codigo para XR
  const leftController = useController("left");
  const rightController = useController("right");

  useFrame((state, delta, XRFrame) => {
    if (XRFrame) {
      const speed = speedKeyPress ? SPEED_MAX_VALUE : SPEED_MIN_VALUE;
      const rotationSpeed = delta * 2; // Ajusta según sea necesario

      if (rightController) {
        const rightGamePad = rightController.inputSource.gamepad;
        if (rightGamePad) {
          const [rx, ry] = rightGamePad.axes;
          setYaw((prev) => prev + rx * rotationSpeed);
          setPitch((prev) => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev - ry * rotationSpeed)));
        }
      }

      if (leftController) {
        const leftGamePad = leftController.inputSource.gamepad;
        if (leftGamePad) {
          const [lx, ly] = leftGamePad.axes;
          moveForward(ly * delta * speed);
          moveRight(lx * delta * speed);
          if (leftGamePad.buttons[0].pressed) moveY(-delta * speed); // Botón A
          if (leftGamePad.buttons[1].pressed) moveY(delta * speed);  // Botón B
        }
      }
    }
  });

  return null;
}
