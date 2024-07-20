import React, { useCallback, useEffect, useRef } from "react";
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
export default function GodCameraControlsXR({ position, targetPosition }) {
  const { camera } = useThree();
  const orbitControls = useRef();

  useEffect(() => {
    // Cambiar la posicion de la camara
    if(position) {
      camera?.position.set(position[0], position[1], position[2]);
      if (targetPosition) {
        orbitControls.current?.target.set(
          targetPosition[0],
          targetPosition[1],
          targetPosition[2]
        );
      } else {
        orbitControls.current?.target.set(0, 0, 0);
      }
    }
  }, [position]);

  useEffect(() => {
    // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo (por ejemplo para cambiar el orbitControls.autoRotate)
    window.orbitControls = orbitControls?.current;
  }, [orbitControls]);

  useEffect(() => {
    // Esto lo hacemos para acceder al orbitControls en cualquier parte del codigo (por ejemplo para cambiar el orbitControls.autoRotate)
    window.camera = camera;
  }, [camera]);

  const speedKeyPress = useKeyPress("ShiftLeft");
  const moveForwardKeyPress = useKeyPress("w");
  const moveBackKeyPress = useKeyPress("s");
  const moveLeftKeyPress = useKeyPress("a");
  const moveRightKeyPress = useKeyPress("d");
  const moveHeight = useKeyPress("e");
  const moveDown = useKeyPress("q");

  const moveForward = useCallback((distance) => {
    vec.setFromMatrixColumn(camera.matrix, 0);
    vec.crossVectors(camera.up, vec);
    camera.position.addScaledVector(vec, distance);
    orbitControls.current.target.addScaledVector(vec, distance);
  }, []);
  const moveRight = useCallback((distance) => {
    vec.setFromMatrixColumn(camera.matrix, 0);
    camera.position.addScaledVector(vec, distance);
    orbitControls.current.target.addScaledVector(vec, distance);
  }, []);
  const moveY = useCallback((distance) => {
    vec.set(0, 1, 0);
    camera.position.addScaledVector(vec, distance);
    orbitControls.current.target.addScaledVector(vec, distance);
  }, []);

  useFrame((_, delta) => {
    const speed = speedKeyPress ? SPEED_MAX_VALUE : SPEED_MIN_VALUE;
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
    // camera.updateMatrixWorld();
  });

  // Codigo para XR
  const leftController = useController('left')
  const rightController = useController('right')

  useFrame((state, delta, XRFrame) => {
    if (XRFrame) {
      if (rightController) {
        const rightGamePad = rightController.inputSource.gamepad
        console.log(rightGamePad)
       /* right joystick values are stored in rightGamePad.axes */
      }
      if (leftController) {
        const leftGamePad = leftController.inputSource.gamepad
        console.log(leftGamePad)
        /* left joystick values are stored in leftGamePad.axes */
      }
    }
  })

  return null;
}
