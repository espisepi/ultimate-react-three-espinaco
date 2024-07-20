import React, { useCallback, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import useKeyPress from "../../hooks/useKeyPress";
import { useController } from "@react-three/xr";

const SPEED_MIN_VALUE = 100;
const SPEED_MAX_VALUE = 500;

export default function GodCameraControlsXR({ position }) {
  const { camera } = useThree();
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    if (position) {
      camera.position.set(position[0], position[1], position[2]);
    }
  }, [position, camera]);

  useEffect(() => {
    window.camera = camera;
  }, [camera]);

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

  const updateRotation = useCallback((deltaYaw, deltaPitch) => {
    setYaw((prev) => prev + deltaYaw);
    setPitch((prev) => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev + deltaPitch)));
  }, []);

  useFrame((_, delta) => {
    const speed = speedKeyPress ? SPEED_MAX_VALUE : SPEED_MIN_VALUE;
    const rotationSpeed = delta * 1;

    if (moveForwardKeyPress) moveForward(delta * speed);
    if (moveBackKeyPress) moveForward(-delta * speed);
    if (moveRightKeyPress) moveRight(delta * speed);
    if (moveLeftKeyPress) moveRight(-delta * speed);
    if (moveHeight) moveY(delta * speed);
    if (moveDown) moveY(-delta * speed);

    if (rotateLeftKeyPress) updateRotation(-rotationSpeed, 0);
    if (rotateRightKeyPress) updateRotation(rotationSpeed, 0);
    if (rotateUpKeyPress) updateRotation(0, -rotationSpeed);
    if (rotateDownKeyPress) updateRotation(0, rotationSpeed);

    camera.rotation.set(pitch, yaw, 0, "YXZ");
  });

  // const leftController = useController("left");
  // const rightController = useController("right");

  // useFrame((state, delta, XRFrame) => {
  //   if (XRFrame) {
  //     const speed = speedKeyPress ? SPEED_MAX_VALUE : SPEED_MIN_VALUE;
  //     const rotationSpeed = delta * 2;

  //     if (rightController) {
  //       const rightGamePad = rightController.inputSource.gamepad;
  //       if (rightGamePad) {
  //         const [rx, ry] = rightGamePad.axes;
  //         updateRotation(rx * rotationSpeed, -ry * rotationSpeed);
  //       }
  //     }

  //     if (leftController) {
  //       const leftGamePad = leftController.inputSource.gamepad;
  //       if (leftGamePad) {
  //         const [lx, ly] = leftGamePad.axes;
  //         moveForward(ly * delta * speed);
  //         moveRight(lx * delta * speed);
  //         if (leftGamePad.buttons[0].pressed) moveY(-delta * speed); // Botón A
  //         if (leftGamePad.buttons[1].pressed) moveY(delta * speed);  // Botón B
  //       }
  //     }
  //   }
  // });

  return null;
}
