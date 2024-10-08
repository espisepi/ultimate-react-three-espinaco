import { useFrame, useThree } from "@react-three/fiber";
import { XROrigin, useXRControllerState } from "@react-three/xr";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";


const SPEED_VALUE = 20;
const ROTATION_SPEED_VALUE = 0.5;

export default function GodCameraControlsXR() {
  // define attributes XR ========

  const leftController = useXRControllerState("left");
  const rightController = useXRControllerState("right");

  const ref = useRef(null);

  // define attributes =======

  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  // define methods ==========

  const moveForward = useCallback(
    (distance) => {
      const direction = new THREE.Vector3();
      ref.current.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      ref.current.position.addScaledVector(direction, distance);
    },
    [ref.current]
  );

  const moveRight = useCallback(
    (distance) => {
      const direction = new THREE.Vector3();
      ref.current.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      direction.cross(ref.current.up);
      ref.current.position.addScaledVector(direction, distance);
    },
    [ref.current]
  );

  const moveY = useCallback(
    (distance) => {
      ref.current.position.y += distance;
    },
    [ref.current]
  );

  const updateRotation = useCallback((deltaYaw, deltaPitch) => {
    setYaw((prev) => prev + deltaYaw);
    setPitch((prev) =>
      Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev + deltaPitch))
    );
  }, [ref.current]);

  // define render ==========

  useFrame((_, delta) => {
    // Check attributes ==============

    if (
      ref.current == null ||
      rightController == null ||
      leftController == null
    ) {
      return;
    }

    // Define attributes =================

    const speed = delta * SPEED_VALUE;
    const rotationSpeed = delta * ROTATION_SPEED_VALUE;

    // Left controllers ========================

    const thumstickStateLeft = leftController.gamepad["xr-standard-thumbstick"];
    if (thumstickStateLeft == null) {
      return;
    }

    const xAxisLeft = thumstickStateLeft.xAxis ?? 0;
    const yAxisLeft = thumstickStateLeft.yAxis ?? 0;

    moveForward(yAxisLeft * speed);
    moveRight(-xAxisLeft * speed);
    // if (leftGamePad.buttons[0].pressed) moveY(-delta * speed); // Botón A
    // if (leftGamePad.buttons[1].pressed) moveY(delta * speed);  // Botón B

    // Right controllers ========================

    const thumstickStateRight =
      rightController.gamepad["xr-standard-thumbstick"];
    if (thumstickStateRight == null) {
      return;
    }

    // ref.current.position.x += (thumstickStateRight.xAxis ?? 0) * delta
    // ref.current.position.z += (thumstickStateRight.yAxis ?? 0) * delta
    const xAxisRight = thumstickStateRight.xAxis ?? 0;
    const yAxisRight = thumstickStateRight.yAxis ?? 0;

    updateRotation(xAxisRight * rotationSpeed, -yAxisRight * rotationSpeed);
    ref.current.rotation.set(0, -yaw, 0, "YXZ");
    // ref.current.rotation.set(pitch, yaw, 0, "YXZ");
    moveY(-yAxisRight * speed);


  });
  return <XROrigin ref={ref} />;
}
